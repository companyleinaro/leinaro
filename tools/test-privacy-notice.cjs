const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url');
const {chromium}=require(process.argv[2]||'playwright');
const root=path.resolve(__dirname,'..'),key='leinaro-privacy-notice-v2';
const url=f=>pathToFileURL(path.join(root,f)).href;
(async()=>{
const browser=await chromium.launch({channel:'chrome',headless:true});const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
await page.goto(url('index.html'));const dialog=page.locator('.cookie-banner');assert(await dialog.isVisible());assert.equal(await page.locator('[data-privacy-accept]').count(),1);assert(!(await dialog.innerText()).includes('Monate'));
await page.locator('[data-privacy-accept]').click();assert.equal(await page.evaluate(k=>localStorage.getItem(k),key),'acknowledged');
for(const file of fs.readdirSync(root).filter(n=>n.endsWith('.html'))){await page.goto(url(file));assert(!(await dialog.isVisible()),'No repeated notice on '+file);}
await page.goto(url('index.html'));await page.reload();assert(!(await dialog.isVisible()),'No repeated notice after reload');
await page.locator('.privacy-settings').click();assert(await dialog.isVisible());await page.locator('[data-privacy-withdraw]').click();assert(!(await dialog.isVisible()));assert.equal(await page.evaluate(k=>localStorage.getItem(k),key),null);await page.reload();assert(await dialog.isVisible());
await page.keyboard.press('Escape');assert(!(await dialog.isVisible()));assert.equal(await page.evaluate(k=>localStorage.getItem(k),key),null);
for(const width of [320,390,650,1440]){await page.setViewportSize({width,height:900});await page.reload();await page.evaluate(()=>document.fonts.ready);assert(await dialog.isVisible());assert(await dialog.evaluate(e=>e.scrollWidth<=e.clientWidth+1));assert(await dialog.locator('h2').evaluate(e=>e.scrollWidth<=e.clientWidth+1));}
const blocked=await browser.newContext();await blocked.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw Error('Blocked');}}));const bp=await blocked.newPage();await bp.goto(url('index.html'));await bp.locator('[data-privacy-accept]').click();assert(!(await bp.locator('.cookie-banner').isVisible()));
await browser.close();console.log('PASS: one acknowledgement button, persistent across all 15 pages and reload, footer reset, Escape, four screen widths and blocked-storage fallback.');
})().catch(e=>{console.error(e);process.exitCode=1;});
