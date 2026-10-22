import { build } from 'vite'
import { cpSync, copyFileSync, readFileSync, writeFileSync, rmSync, existsSync, mkdirSync } from 'node:fs'

// Pipeline de publicacion:
//   1. Compila el sitio (React + Vite) -> dist/
//   2. Copia dist/assets a assets/ con nombres fijos
//   3. index.html: rutas relativas a assets/app.js y assets/style.css
// Las politicas (vprex-privacidad.html / wprex-privacidad.html) son HTML
// estatico e independiente: no reciben CSS externo para no alterar su
// apariencia original (Google Play las revisa una a una).
// Uso: npm run publish (y npm run deploy para publicar en GitHub Pages)

if (existsSync('dist')) rmSync('dist', { recursive: true, force: true })
await build()

if (!existsSync('dist/assets/app.js')) {
  console.error('No se genero dist/assets/app.js')
  process.exit(1)
}

if (existsSync('assets')) rmSync('assets', { recursive: true, force: true })
mkdirSync('assets', { recursive: true })
cpSync('dist/assets', 'assets', { recursive: true })

const index = readFileSync('dist/index.html', 'utf8')
  .replace(/crossorigin(?:="")?\s*/g, '')
  .replace(/href="\.?\/assets\//g, 'href="assets/')
  .replace(/src="\.?\/assets\//g, 'src="assets/')
  .replace('assets/favicon.svg', 'favicon.svg')

writeFileSync('index.html', index, 'utf8')
copyFileSync('dist/favicon.svg', 'favicon.svg')
console.log('ok: raiz del repo lista para GitHub Pages')
