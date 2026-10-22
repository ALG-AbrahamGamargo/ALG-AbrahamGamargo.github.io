import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 950 } })
await page.goto(process.argv[2] || 'http://localhost:4173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2000)
const info = await page.evaluate(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return sel + ': NO EXISTE'
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    return `${sel}: x=${Math.round(r.x)} y=${Math.round(r.y)} w=${Math.round(r.width)} h=${Math.round(r.height)} display=${cs.display} grid=${cs.gridTemplateColumns} align=${cs.alignItems}`
  }
  return ['.hero__inner', '.hero__body', '.hero__showcase', '.hero__title'].map(pick).join('\n')
})
console.log(info)
await browser.close()
