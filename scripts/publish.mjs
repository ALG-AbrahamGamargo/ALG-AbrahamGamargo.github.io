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

// Logos de las aplicaciones: el JS los pide como /wprex/icono.png y
// /vprex/logo.png, así que tienen que existir en la RAÍZ del repo, no solo
// dentro de public/ (GitHub Pages sirve la raíz).
for (const carpeta of ['wprex', 'vprex']) {
  const origen = `public/${carpeta}`
  if (!existsSync(origen)) continue
  if (existsSync(carpeta)) rmSync(carpeta, { recursive: true, force: true })
  cpSync(origen, carpeta, { recursive: true })
}

// index.html: se mantiene el HTML fuente (meta tags, fuentes, SEO) y solo se
// sustituye el script de desarrollo por el bundle compilado.
const html = readFileSync('index.html', 'utf8')
  .replace(/<script type="module" src="\/src\/main\.jsx"><\/script>/, '<script type="module" src="assets/app.js"></script>')
  .replace('<link rel="icon" type="image/svg+xml" href="/favicon.svg" />', '<link rel="icon" type="image/svg+xml" href="favicon.svg" />')

writeFileSync('index.html', html, 'utf8')

// Páginas informativas de cada app: HTML estático e independiente (como las
// políticas). Viven en src/paginas/ y se copian a la raíz en cada publicación.
for (const pagina of ['whatprex.html', 'vprex.html']) {
  if (existsSync(`src/paginas/${pagina}`)) {
    cpSync(`src/paginas/${pagina}`, pagina)
  }
}

// Versión publicada de la extensión Whatprex.
//
// La extensión consulta este archivo cuando el usuario abre el panel lateral:
// https://alg-abrahamgamargo.github.io/whatprex-latest.json
// Si la versión de aquí es mayor que la instalada, la extensión muestra el
// aviso de "hay una versión nueva" y enlaza a la Chrome Web Store.
//
// La fuente vive en src/data/whatprex-latest.json para que quede versionada
// con el sitio y se publique SIEMPRE, sin depender de acordarse de copiarla.
const LATEST = 'src/data/whatprex-latest.json'
if (existsSync(LATEST)) {
  const datos = JSON.parse(readFileSync(LATEST, 'utf8'))
  // Validación mínima: sobre OFUSCADO y FIRMADO con "p" (contenido) y "f" (firma).
  if (!datos.p || !datos.f) {
    console.error('whatprex-latest.json: falta el contenido ("p") o la firma ("f")')
    process.exit(1)
  }
  // La extensión lo busca en /assets/wprex/v.json (ruta menos obvia).
  mkdirSync('assets/wprex', { recursive: true })
  cpSync(LATEST, 'assets/wprex/v.json')
  console.log('  · assets/wprex/v.json (firmado)')
} else {
  console.warn('  ! falta src/data/whatprex-latest.json: la extensión no podrá avisar de versiones nuevas')
}

console.log('ok: raiz del repo lista para GitHub Pages')
