// Repara archivos que PowerShell leyó como ANSI y dejó caracteres "Â".
// Uso: node scripts/fix-mojibake.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name)
    return statSync(p).isDirectory() ? walk(p) : [p]
  })
}

const files = [...walk('src'), 'index.html', 'vite.config.js', 'package.json', 'scripts/shot.mjs']

const replacements = [
  [/Â\xa0/g, ' '],
  [/Ã¡/g, 'á'], [/Ã©/g, 'é'], [/Ã­/g, 'í'], [/Ã³/g, 'ó'], [/Ãº/g, 'ú'],
  [/Ã±/g, 'ñ'], [/Ã¼/g, 'ü'], [/Ã‘/g, 'Ñ'], [/Ã\x81/g, 'Á'],
  [/Â·/g, '·'], [/Â°/g, '°'], [/Â¿/g, '¿'], [/Â¡/g, '¡'],
  [/â€”/g, '—'], [/â€“/g, '–'], [/â€œ/g, '“'], [/â€\x9d/g, '”'], [/â€™/g, '’'],
  [/â€¦/g, '…'], [/â†’/g, '→'], [/â€¯/g, '·'],
  [/Â (?=[a-zA-Záéíóúñ])/g, ''],
]

let fixed = 0
for (const f of files) {
  const raw = readFileSync(f, 'utf8').replace(/^\uFEFF/, '')
  let out = raw
  for (const [re, to] of replacements) out = out.replace(re, to)
  if (out !== raw) {
    writeFileSync(f, out, 'utf8')
    fixed++
    console.log('reparado:', f)
  } else if (raw !== readFileSync(f, 'utf8')) {
    writeFileSync(f, raw, 'utf8')
    console.log('BOM quitado:', f)
  }
}
console.log(fixed ? `${fixed} archivo(s) reparado(s)` : 'nada que reparar')
