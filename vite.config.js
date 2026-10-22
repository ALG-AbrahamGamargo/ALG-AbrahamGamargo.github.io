import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'

// Despliegue en GitHub Pages (repo de usuario, Pages desde la rama main).
// El sitio publicado vive en la raíz: index.html + assets/app.js + assets/style.css
//
// npm run dev      -> desarrollo
// npm run publish  -> build + copia a la raíz del repo
// npm run deploy   -> publish + commit + push
//
// La entrada del JS es src/main.jsx (no index.html) para garantizar que Vite
// compile siempre el código actual de /src.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      input: { app: resolve('src/main.jsx') },
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: ({ names = [] }) =>
          names.some((n) => n.endsWith('.css')) ? 'assets/style.css' : 'assets/[name][extname]',
      },
    },
  },
  server: { port: 5173 },
})
