// gameFlow.test.js 測試代碼
const puppeteer = require('puppeteer');

describe('Game Flow', () => {
    let browser, page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto('file:///C:/JS/ClaudeTest/CursorTest/SnakeT/index.html');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('should start in snake mode and switch to tetris mode', async () => {
        // 模擬蛇吃到水果
        await page.keyboard.press('ArrowRight');
        // ... 其他操作 ...
        const gameState = await page.evaluate(() => gameManager.state);
        expect(gameState).toBe('tetris');
    });

    test('should restart the game', async () => {
        await page.keyboard.press('KeyR');
        const gameState = await page.evaluate(() => gameManager.state);
        expect(gameState).toBe('snake');
    });

    // ... 其他測試 ...
});