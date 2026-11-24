#!/usr/bin/env node
/**
 * Lee la tasa oficial (dólar y euro) de bcv.org.ve y escribe vprex/bcv.json.
 *
 * ─── SOBRE LAS FECHAS (lo más delicado) ──────────────────────────────────────
 *
 * El BCV no siempre publica "la de mañana". Depende del día:
 *
 *   · Lunes a jueves  → publica la del DÍA SIGUIENTE        (salto de 1)
 *   · VIERNES         → publica la del LUNES                (salto de 3)
 *   · Antes de feriado→ publica la del día hábil siguiente  (salto de 2-5)
 *
 * ⚠️ Este script NO calcula ninguna fecha. Copia la "Fecha Valor" tal como la
 *    publica el BCV. Así nunca nos equivocamos con los saltos: si el viernes
 *    el BCV dice 30/11 (lunes), eso es lo que se escribe.
 *
 * Fuente de la fecha:
 *   <span property="dc:date" content="2026-11-25T00:00:00-04:00"
 *         class="date-display-single">Miércoles, 25 Noviembre 2026</span>
 *
 * ⚠️ La página tiene VARIAS etiquetas `date-display-single` (las del menú
 *    lateral: "Octubre - 2026", "20/11/2026"...). La buena es SIEMPRE la
 *    PRIMERA, la que viene acompañada de `property="dc:date"`.
 *
 * ─── ORDEN DE LAS MONEDAS ────────────────────────────────────────────────────
 *
 * Los valores `<strong class="strong-tb">` aparecen SIEMPRE en este orden:
 *
 *     euro · yuan · lira · rublo · dolar
 *
 * Verificado el 24/11/2026. Antes de leer por posición se comprueba que existan
 * los 5 bloques `id="..."`: si falta alguno, la página cambió y no se adivina.
 *
 * ─── SI ALGO FALLA ───────────────────────────────────────────────────────────
 *
 * El JSON se escribe con "status": "error". La app, al verlo, ignora el archivo
 * y sigue usando DolarApi.com exactamente como hoy. Nunca rompe nada.
 */

import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import https from 'node:https';

const BCV_URL = 'https://www.bcv.org.ve/';
const OUT_FILE = 'vprex/bcv.json';
const TIMEOUT_MS = 20_000;

/**
 * ⚠️ CERTIFICADO INTERMEDIO
 *
 * bcv.org.ve NO envía el certificado intermedio de Sectigo en el handshake.
 * Su certificado es válido, pero la cadena está incompleta y algunos clientes
 * (entre ellos `fetch` de Node) la rechazan con
 * "unable to verify the first certificate".
 *
 * La solución es pasarle ese intermedio a la conexión. Se descargó de la CA
 * oficial de Sectigo:
 *
 *   http://crt.sectigo.com/SectigoPublicServerAuthenticationCAOVR36.crt
 *
 * Válido hasta el 21/03/2036.
 *
 * ⚠️ Esto NO desactiva la validación: sigue validando la cadena completa y el
 *    nombre del servidor. Solo completa el eslabón que el BCV no manda.
 */
const SECTIGO_CA = (() => {
  try {
    const dir = dirname(fileURLToPath(import.meta.url));
    return readFileSync(join(dir, 'sectigo-chain.pem'), 'utf8');
  } catch {
    return null;
  }
})();

/** Orden real de los valores en el HTML (verificado). */
const VALUE_ORDER = ['euro', 'yuan', 'lira', 'rublo', 'dolar'];

/** "1.012,21844036" → 1012.21844036. Devuelve NaN si no encaja. */
function parseVeNumber(raw) {
  const clean = String(raw ?? '').trim().replace(/\s/g, '');
  if (!/^\d{1,3}(\.\d{3})*(,\d+)?$|^\d+(,\d+)?$/.test(clean)) return NaN;
  return Number(clean.replace(/\./g, '').replace(',', '.'));
}

/** Escribe el JSON. `extra` se mezcla con los datos comunes. */
function writeJson(payload) {
  const body = {
    // Cuándo se generó este archivo (ISO, UTC).
    actualizado: new Date().toISOString(),
    fuente: 'bcv.org.ve',
    ...payload,
  };
  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, `${JSON.stringify(body, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify(body, null, 2));
}

/**
 * Descarga la página del BCV usando `https` de Node, con el intermedio de
 * Sectigo añadido a la cadena de confianza.
 */
function fetchBcvHtml() {
  return new Promise((resolve, reject) => {
    const req = https.get(
      BCV_URL,
      {
        headers: {
          // El BCV rechaza peticiones sin User-Agent de navegador.
          'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml',
          'Accept-Language': 'es-VE,es;q=0.9',
        },
        // Solo se AÑADE el intermedio: la validación sigue activa.
        ca: SECTIGO_CA ? [SECTIGO_CA] : undefined,
        timeout: TIMEOUT_MS,
      },
      (res) => {
        if (res.statusCode !== 200) {
          res.resume();
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        let data = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => resolve(data));
      },
    );

    req.on('timeout', () => {
      req.destroy(new Error('tiempo de espera agotado'));
    });
    req.on('error', reject);
  });
}

async function main() {
  let html;
  try {
    html = await fetchBcvHtml();
  } catch (err) {
    writeJson({ status: 'error', reason: `sin conexión: ${err.message}` });
    return;
  }

  // ── 1. Comprobar que la página tiene la estructura esperada ──
  const missing = VALUE_ORDER.filter((id) => !html.includes(`id="${id}"`));
  if (missing.length > 0) {
    writeJson({
      status: 'error',
      reason: `faltan los bloques: ${missing.join(', ')} (la página cambió)`,
    });
    return;
  }

  // ── 2. Valores por posición ──
  const values = [...html.matchAll(/strong-tb">([^<]*)</g)]
    .map((m) => parseVeNumber(m[1]))
    .filter((n) => Number.isFinite(n) && n > 0);

  if (values.length < VALUE_ORDER.length) {
    writeJson({
      status: 'error',
      reason: `se esperaban ${VALUE_ORDER.length} valores y llegaron ${values.length}`,
    });
    return;
  }

  const euro = values[VALUE_ORDER.indexOf('euro')];
  const dolar = values[VALUE_ORDER.indexOf('dolar')];

  if (!dolar || !euro) {
    writeJson({ status: 'error', reason: 'valores de dólar o euro inválidos' });
    return;
  }

  // ── 3. Fecha valor ──
  // SOLO la que viene con property="dc:date". Es la primera de la página;
  // las demás son del menú lateral (meses y fechas de archivo).
  const fechaMatch = html.match(
    /property="dc:date"[^>]*content="(\d{4}-\d{2}-\d{2})T[^"]*"/,
  );
  const fechaValor = fechaMatch?.[1];

  if (!fechaValor) {
    writeJson({ status: 'error', reason: 'no se encontró la fecha valor' });
    return;
  }

  // ── 4. Todo correcto ──
  writeJson({ status: 'ok', fechaValor, dolar, euro });
}

main().catch((err) => {
  writeJson({ status: 'error', reason: `excepción: ${err.message}` });
});
