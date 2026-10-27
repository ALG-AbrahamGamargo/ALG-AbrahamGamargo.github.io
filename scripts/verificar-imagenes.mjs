/**
 * Revisa que TODAS las imágenes que pide el sitio existan en la raíz,
 * que es lo que sirve GitHub Pages. Evita logos rotos tras publicar.
 */
import { existsSync } from 'node:fs';
import { readFileSync } from 'node:fs';
import { join, extname } from 'node:path';

const ROOT = process.cwd();
const JS = readFileSync(join(ROOT, 'assets', 'app.js'), 'utf8');

/* Rutas absolutas de imagen dentro del bundle. */
const rutas = new Set();
for (const m of JS.matchAll(/["'`](\/[^"'`\s]+\.(?:png|webp|jpg|jpeg|svg|ico))["'`]/gi)) {
  rutas.add(m[1]);
}
/* Y las del index.html. */
const HTML = readFileSync(join(ROOT, 'index.html'), 'utf8');
for (const m of HTML.matchAll(/(?:href|src)="([^"#?]+\.(?:png|webp|svg|ico))"/gi)) {
  rutas.add(m[1].startsWith('/') ? m[1] : '/' + m[1]);
}

const faltan = [];
const ok = [];

for (const ruta of [...rutas].sort()) {
  const local = join(ROOT, ruta.replace(/^\//, ''));
  if (existsSync(local)) ok.push(ruta);
  else faltan.push(ruta);
}

console.log(`Revisadas: ${rutas.size} rutas de imagen`);
console.log(`Existen:   ${ok.length}`);
console.log(`Faltan:    ${faltan.length}`);

if (faltan.length) {
  console.log('\n✖ FALTAN en la raíz (se verían rotas):');
  faltan.forEach((f) => console.log('   ' + f));
  process.exit(1);
}

console.log('\n✔ Todas las imágenes del sitio existen en la raíz');
