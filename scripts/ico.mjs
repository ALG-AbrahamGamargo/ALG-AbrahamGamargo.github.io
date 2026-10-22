import { writeFileSync, readFileSync } from 'node:fs'

// Genera favicon.ico (16/32/48) a partir de los PNG ya rasterizados.
const pngs = ['public/favicon-16.png', 'public/favicon-32.png', 'public/favicon-48.png'].map((f) => readFileSync(f))

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // type = icon
header.writeUInt16LE(pngs.length, 4)

const entries = []
let offset = 6 + 16 * pngs.length

for (const png of pngs) {
  const size = png.readUInt32BE(16) // width en IHDR
  const e = Buffer.alloc(16)
  e.writeUInt8(size >= 256 ? 0 : size, 0)
  e.writeUInt8(size >= 256 ? 0 : size, 1)
  e.writeUInt8(0, 2) // paleta
  e.writeUInt8(0, 3) // reserved
  e.writeUInt16LE(1, 4) // planes
  e.writeUInt16LE(32, 6) // bpp
  e.writeUInt32LE(png.length, 8)
  e.writeUInt32LE(offset, 12)
  offset += png.length
  entries.push(e)
}

writeFileSync('public/favicon.ico', Buffer.concat([header, ...entries, ...pngs]))
console.log('favicon.ico generado')
