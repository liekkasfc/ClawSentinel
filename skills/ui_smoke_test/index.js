const { chromium } = require('playwright');
require('dotenv').config();

async function runSmokeTest(path = '/login', baseUrl = process.env.BASE_URL) {
    const browser = await chromium.launch({ headless: true });
    try {
        const page = await browser.newPage();
        const fullUrl = `${baseUrl}${path}`;
        await page.goto(fullUrl, { timeout: 10000 });

        await page.fill('input[type="email"], input[name="email"], #email', process.env.TEST_USER || 'test@example.com');
        await page.fill('input[type="password"], input[name="password"], #password', process.env.TEST_PASS || '123456');
        await page.click('button[type="submit"], #login-button, button:has-text("Sign in"), button:has-text("Sign In")');

        // Wait for dashboard or similar indicator
        await page.waitForSelector('.dashboard, #dashboard, h1:has-text("Welcome back"), :has-text("Available Credits")', { timeout: 10000 });

        return {
            module: "ui_smoke_test",
            pass: true,
            reason: null
        };
    } catch (error) {
        return {
            module: "ui_smoke_test",
            pass: false,
            reason: error.message
        };
    } finally {
        await browser.close();
    }
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const pathArg = args.find(a => a.startsWith('--path='))?.split('=')[1];
    runSmokeTest(pathArg).then(res => console.log(JSON.stringify(res, null, 2)));
}

module.exports = runSmokeTest;
