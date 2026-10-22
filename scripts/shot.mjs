import { chromium } from 'playwright'

const url = process.argv[2] || 'http://localhost:4173/'
const out = process.argv[3] || 'shot'

const browser = await chromium.launch()
const errors = []

async function shot(name, width, height, opts = {}) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 })
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`[${name}] ${m.text()}`) })
  page.on('pageerror', (e) => errors.push(`[${name}] PAGEERROR ${e.message}`))
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2200)

  if (opts.full) {
    // Ir bajando para disparar los reveals (whileInView)
    const total = await page.evaluate(() => document.body.scrollHeight)
    for (let y = 0; y < total; y += 500) {
      await page.evaluate((v) => window.scrollTo(0, v), y)
      await page.waitForTimeout(160)
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(1200)
  }
  if (opts.scroll) {
    await page.evaluate((y) => window.scrollTo({ top: y }), opts.scroll)
    await page.waitForTimeout(1600)
  }

  await page.screenshot({ path: `${out}-${name}.png`, fullPage: !!opts.full })
  await page.close()
}

await shot('desktop', 1440, 950)
await shot('desktop-full', 1440, 950, { full: true })
await shot('apps', 1440, 950, { scroll: 2100 })
await shot('stack', 1440, 950, { scroll: 3200 })
await shot('mobile', 390, 844)
await shot('mobile-full', 390, 844, { full: true })

console.log(errors.length ? errors.join('\n') : 'sin errores de consola')
await browser.close()
