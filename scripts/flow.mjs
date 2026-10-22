import { chromium } from 'playwright'

const base = 'http://localhost:4173'
const browser = await chromium.launch()
const errors = []
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()) })

// Flujo: home -> privacidad -> VPREX
await page.goto(base + '/', { waitUntil: 'networkidle' })
await page.click('footer a[href="/vprex-privacidad.html"]')
await page.waitForLoadState('networkidle')
console.log('Vista VPREX:', page.url(), '|', await page.title())
await page.screenshot({ path: 'shots/policy-vprex-mobile.png', fullPage: false })
await page.click('a.volver')
await page.waitForLoadState('networkidle')
console.log('Volver:', page.url())

await page.goto(base + '/privacidad.html', { waitUntil: 'networkidle' })
await page.screenshot({ path: 'shots/privacidad-mobile.png' })

await page.goto(base + '/vprex/privacidad.html', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
console.log('Redirect VPREX ->', page.url(), '|', await page.title())

// Menú móvil
await page.goto(base + '/', { waitUntil: 'networkidle' })
await page.click('.burger')
await page.waitForTimeout(700)
await page.screenshot({ path: 'shots/menu-mobile.png' })

// Enlaces internos de la home
const links = await page.$$eval('a', (as) => [...new Set(as.map((a) => a.getAttribute('href')))])
console.log(links.join(' '))

console.log(errors.length ? errors.join('\n') : 'sin errores')
await browser.close()
