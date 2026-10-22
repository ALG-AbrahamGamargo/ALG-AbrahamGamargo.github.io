import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 950 }, deviceScaleFactor: 2 })
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await page.evaluate(() => document.querySelector('#apps').scrollIntoView())
await page.waitForTimeout(2500)
const el = await page.$('.apps__grid')
await el.screenshot({ path: 'shots/cards.png' })
await browser.close()
