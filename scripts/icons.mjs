import { copyFileSync, readFileSync, writeFileSync, existsSync } from 'node:fs'

const ICONS = [
  'favicon.svg',
  'favicon.ico',
  'favicon-16.png',
  'favicon-32.png',
  'favicon-48.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
]

for (const file of ICONS) {
  if (!existsSync(`public/${file}`)) {
    console.warn('falta public/' + file)
    continue
  }
  copyFileSync(`public/${file}`, file)
}

// Etiquetas <link rel="icon"> completas (una sola vez)
const LINKS = [
  '<link rel="icon" type="image/svg+xml" href="favicon.svg" />',
  '<link rel="icon" type="image/png" sizes="32x32" href="favicon-32.png" />',
  '<link rel="icon" type="image/png" sizes="16x16" href="favicon-16.png" />',
  '<link rel="shortcut icon" href="favicon.ico" />',
  '<link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />',
].join('\n    ')

const html = readFileSync('index.html', 'utf8')
  .replace(/\n\s*<link rel="(?:icon|shortcut icon|apple-touch-icon)"[^>]*>/g, '')
  .replace('<link rel="stylesheet" href="assets/style.css">', '<link rel="stylesheet" href="assets/style.css" />')

writeFileSync('index.html', html.replace('</head>', `    ${LINKS}\n  </head>`), 'utf8')

// Las políticas también llevan el favicon nuevo
for (const file of ['vprex-privacidad.html', 'wprex-privacidad.html']) {
  const src = readFileSync(file, 'utf8')
  writeFileSync(file, src.replace(/<link rel="icon"[^>]*>/, '<link rel="icon" type="image/png" href="/favicon-32.png" />'), 'utf8')
}

console.log('ok: favicons copiados y enlazados')
