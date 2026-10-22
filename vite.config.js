import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'

// Desplegado en GitHub Pages con repo de usuario:
// https://alg-abrahamgamargo.github.io/  -> base "/"
//
// Vite solo procesa HTML que esté en la raíz, así que las políticas de
// privacidad viven como vprex-privacidad.html / wprex-privacidad.html y se
// publican también en /vprex/privacidad.html para conservar las URLs viejas.
const privacyRedirect = (destino, titulo) => `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="0; url=${destino}" />
    <link rel="canonical" href="${destino}" />
    <title>${titulo} — Aionel</title>
    <style>
      html,body{height:100%}
      body{margin:0;display:grid;place-items:center;background:#05070a;color:#f4f7f5;
        font-family:Inter,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;text-align:center;padding:24px}
      a{color:#00e087;font-weight:600}
      .dot{width:8px;height:8px;border-radius:50%;background:#00e087;margin:0 auto 18px;
        box-shadow:0 0 16px #00e087;animation:p 1.6s ease-in-out infinite}
      @keyframes p{50%{opacity:.35}}
    </style>
  </head>
  <body>
    <div>
      <div class="dot"></div>
      <p>Redirigiendo a la política de privacidad…</p>
      <p><a href="${destino}">Continuar</a></p>
    </div>
  </body>
</html>
`

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    {
      name: 'privacy-url-redirects',
      apply: 'build',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'vprex/privacidad.html',
          source: privacyRedirect('../../vprex-privacidad.html', 'Política de privacidad de VPREX'),
        })
        this.emitFile({
          type: 'asset',
          fileName: 'wprex/privacidad.html',
          source: privacyRedirect('../../wprex-privacidad.html', 'Política de privacidad de Wprex'),
        })
      },
    },
  ],
  build: {
    outDir: 'dist',
    target: 'es2020',
    rollupOptions: {
      input: {
        main: resolve('index.html'),
        privacidad: resolve('privacidad.html'),
        vprexPrivacidad: resolve('vprex-privacidad.html'),
        wprexPrivacidad: resolve('wprex-privacidad.html'),
      },
    },
  },
  server: { port: 5173 },
})
