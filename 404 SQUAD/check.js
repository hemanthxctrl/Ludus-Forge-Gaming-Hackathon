const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('BROWSER_CONSOLE:', msg.text()));
        page.on('pageerror', err => console.log('BROWSER_ERROR:', err.toString()));
        
        await page.goto('file:///' + __dirname.replace(/\\/g, '/') + '/N-block-mind-descent.html');
        await page.waitForTimeout(2000);
        
        await browser.close();
    } catch (e) {
        console.log(e);
    }
})();
