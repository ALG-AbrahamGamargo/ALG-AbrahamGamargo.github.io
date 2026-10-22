import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'

// Despliegue en GitHub Pages (repo de usuario, Pages desde la rama main).
// El build se publica con nombres fijos en assets/app.js y assets/style.css.
//
// npm run dev      -> desarrollo
// npm run publish  -> build + copia a la raiz del repo
// npm run deploy   -> publish + commit + push
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        vprexPrivacidad: resolve('vprex-privacidad.html'),
        wprexPrivacidad: resolve('wprex-privacidad.html'),
      },
      output: {
        entryFileNames: 'assets/app.js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: (info) =>
          (info.names ?? []).some((n) => n.endsWith('.css')) ? 'assets/style.css' : 'assets/[name][extname]',
      },
    },
  },
  server: { port: 5173 },
})
