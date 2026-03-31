const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        let errors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push('CONSOLE ERROR: ' + msg.text());
            }
        });
        page.on('pageerror', err => {
            errors.push('PAGE ERROR: ' + err.toString());
        });
        
        await page.goto('file:///' + __dirname.replace(/\\/g, '/') + '/N-block-mind-descent.html');
        
        // wait
        await new Promise(r => setTimeout(r, 1000));
        await page.click('#menu-start');
        await new Promise(r => setTimeout(r, 1000));
        
        if (errors.length > 0) {
            console.log("ERRORS FOUND:");
            console.log(errors.join('\n'));
        } else {
            console.log('No errors captured!');
        }
        
        await browser.close();
    } catch (e) {
        console.log("Script error:", e.message);
    }
})();
