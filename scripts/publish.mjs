import { build } from 'vite'
import { cpSync, copyFileSync, readFileSync, writeFileSync, rmSync, existsSync, mkdirSync } from 'node:fs'

// Publica el sitio en la raíz del repo (lo que sirve GitHub Pages):
//   assets/app.js · assets/style.css (nombres fijos)
//   index.html (el HTML fuente, apuntando a esos assets)
// Las políticas son HTML estático e independiente (sin CSS externo).
//
// Uso: npm run publish  ·  npm run deploy (publish + commit + push)

if (existsSync('dist')) rmSync('dist', { recursive: true, force: true })
await build()

if (!existsSync('dist/assets/app.js')) {
  console.error('No se genero dist/assets/app.js')
  process.exit(1)
}

if (existsSync('assets')) rmSync('assets', { recursive: true, force: true })
mkdirSync('assets', { recursive: true })
cpSync('dist/assets', 'assets', { recursive: true })
copyFileSync('dist/favicon.svg', 'favicon.svg')
if (existsSync('shots')) rmSync('shots', { recursive: true, force: true })
cpSync('public/shots', 'shots', { recursive: true, filter: (src) => !src.includes('..') })

// index.html: se mantiene el HTML fuente (meta tags, fuentes, SEO) y solo se
// sustituye el script de desarrollo por el bundle compilado.
const html = readFileSync('index.html', 'utf8')
  .replace(/<script type="module" src="\/src\/main\.jsx"><\/script>/, '<script type="module" src="assets/app.js"></script>')
  .replace('<link rel="icon" type="image/svg+xml" href="/favicon.svg" />', '<link rel="icon" type="image/svg+xml" href="favicon.svg" />')

writeFileSync('index.html', html, 'utf8')
console.log('ok: raiz del repo lista para GitHub Pages')
