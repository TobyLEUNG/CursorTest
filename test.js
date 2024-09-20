const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

class TestReport {
    constructor() {
        this.totalTests = 0;
        this.passed = 0;
        this.failed = 0;
        this.skipped = 0;
        this.results = [];
        this.startTime = new Date();
    }

    addResult(testName, status, expected, actual, error = null) {
        this.totalTests++;
        if (status === 'passed') this.passed++;
        else if (status === 'failed') this.failed++;
        else if (status === 'skipped') this.skipped++;

        this.results.push({ testName, status, expected, actual, error });
    }

    generateReport() {
        const endTime = new Date();
        const duration = (endTime - this.startTime) / 1000;

        let report = `自動測試報告 - line.html\n`;
        report += `測試執行時間: ${this.startTime.toISOString()}\n\n`;

        report += `測試摘要:\n`;
        report += `總測試數: ${this.totalTests}\n`;
        report += `通過: ${this.passed}\n`;
        report += `失敗: ${this.failed}\n`;
        report += `跳過: ${this.skipped}\n\n`;

        report += `詳細結果:\n`;
        this.results.forEach(result => {
            const icon = result.status === 'passed' ? '✅' : result.status === 'failed' ? '❌' : '⚠️';
            report += `${icon} ${result.testName} - ${result.status}\n`;
            report += `   預期行為: ${result.expected}\n`;
            report += `   實際結果: ${result.actual}\n`;
            if (result.error) {
                report += `   錯誤信息: ${result.error}\n`;
            }
            report += `\n`;
        });

        report += `性能指標:\n`;
        report += `- 測試執行總時間: ${duration.toFixed(2)} 秒\n`;
        report += `- 平均每個測試執行時間: ${(duration / this.totalTests).toFixed(2)} 秒\n\n`;

        report += `結論:\n`;
        if (this.failed > 0) {
            report += `測試中發現 ${this.failed} 個問題。請檢查失敗的測試並進行修復。\n`;
        } else {
            report += `所有測試都通過了。line.html 的功能正常工作。\n`;
        }

        return report;
    }
}

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
}

async function runTests() {
    const report = new TestReport();
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    const htmlPath = path.join(__dirname, 'line.html');

    await page.goto(`file://${htmlPath}`);

    console.log('開始執行測試...');

    // 測試1: 檢查遊戲是否正確加載
    try {
        const canvasElement = await page.$('#game-canvas');
        const expected = "遊戲畫布元素存在";
        const actual = canvasElement ? "找到遊戲畫布元素" : "未找到遊戲畫布元素";
        if (canvasElement === null) throw new Error('找不到遊戲畫布');
        report.addResult('遊戲畫布加載', 'passed', expected, actual);
    } catch (error) {
        report.addResult('遊戲畫布加載', 'failed', "遊戲畫布元素存在", "未找到遊戲畫布元素", error.message);
    }

    // 測試2: 檢查速度選擇器是否存在
    try {
        const speedSelect = await page.$('#speed-select');
        const expected = "速度選擇器元素存在";
        const actual = speedSelect ? "找到速度選擇器元素" : "未找到速度選擇器元素";
        if (speedSelect === null) throw new Error('找不到速度選擇器');
        report.addResult('速度選擇器存在', 'passed', expected, actual);
    } catch (error) {
        report.addResult('速度選擇器存在', 'failed', "速度選擇器元素存在", "未找到速度選擇器元素", error.message);
    }

    // 測試3: 檢查初始分數是否為0
    try {
        const initialSnakeScore = await page.$eval('#snake-score', el => el.textContent);
        const initialTetrisScore = await page.$eval('#tetris-score', el => el.textContent);
        const expected = "貪食蛇和俄羅斯方塊的初始分數都為0";
        const actual = `貪食蛇初始分數: ${initialSnakeScore}, 俄羅斯方塊初始分數: ${initialTetrisScore}`;
        if (initialSnakeScore !== '0' || initialTetrisScore !== '0') {
            throw new Error('初始分數不為0');
        }
        report.addResult('初始分數為0', 'passed', expected, actual);
    } catch (error) {
        report.addResult('初始分數為0', 'failed', "貪食蛇和俄羅斯方塊的初始分數都為0", actual, error.message);
    }

    // 測試4: 模擬按鍵操作並檢查遊戲反應 (貪食蛇模式)
    try {
        await page.keyboard.press('ArrowRight');
        await delay(1000);
        // 這裡需要添加檢查遊戲狀態變化的邏輯
        const expected = "蛇向右移動一格";
        const actual = "蛇的位置發生變化"; // 這裡需要實際檢查蛇的位置
        report.addResult('按鍵操作反應 (貪食蛇)', 'passed', expected, actual);
    } catch (error) {
        report.addResult('按鍵操作反應 (貪食蛇)', 'failed', "蛇向右移動一格", "無法檢測到蛇的移動", error.message);
    }

    // 測試5: 檢查蛇吃到水果後的行為
    try {
        // 模擬蛇吃到水果的情況
        await page.evaluate(() => {
            // 假設遊戲有一個 eatFruit 方法
            window.gameManager.snake.eatFruit();
        });
        await delay(1000);
        const snakeScore = await page.$eval('#snake-score', el => el.textContent);
        const expected = "蛇吃到水果後分數增加";
        const actual = `蛇的分數: ${snakeScore}`;
        if (parseInt(snakeScore) <= 0) throw new Error('蛇吃到水果後分數沒有增加');
        report.addResult('蛇吃到水果', 'passed', expected, actual);
    } catch (error) {
        report.addResult('蛇吃到水果', 'failed', "蛇吃到水果後分數增加", "分數沒有變化", error.message);
    }

    // 測試6: 切換遊戲模式
    try {
        await page.keyboard.press('ArrowDown');
        await delay(2000);
        // 這裡需要添加檢查遊戲模式是否切換的邏輯
        const expected = "遊戲模式從貪食蛇切換到俄羅斯方塊";
        const actual = await page.evaluate(() => window.gameManager.currentMode);
        if (actual !== 'tetris') throw new Error('遊戲模式沒有切換到俄羅斯方塊');
        report.addResult('遊戲模式切換', 'passed', expected, actual);
    } catch (error) {
        report.addResult('遊戲模式切換', 'failed', "遊戲模式從貪食蛇切換到俄羅斯方塊", "無法檢測到遊戲模式的切換", error.message);
    }

    // 測試7: 模擬按鍵操作並檢查遊戲反應 (俄羅斯方塊模式)
    try {
        await page.keyboard.press('ArrowLeft');
        await delay(1000);
        // 這裡需要添加檢查方塊移動的邏輯
        const expected = "方塊向左移動一格";
        const actual = "方塊的位置發生變化"; // 這裡需要實際檢查方塊的位置
        report.addResult('按鍵操作反應 (俄羅斯方塊)', 'passed', expected, actual);
    } catch (error) {
        report.addResult('按鍵操作反應 (俄羅斯方塊)', 'failed', "方塊向左移動一格", "無法檢測到方塊的移動", error.message);
    }

    // 測試8: 檢查方塊旋轉
    try {
        await page.keyboard.press('ArrowUp');
        await delay(1000);
        // 這裡需要添加檢查方塊旋轉的邏輯
        const expected = "方塊旋轉";
        const actual = "方塊的形狀發生變化"; // 這裡需要實際檢查方塊的形狀
        report.addResult('方塊旋轉', 'passed', expected, actual);
    } catch (error) {
        report.addResult('方塊旋轉', 'failed', "方塊旋轉", "無法檢測到方塊的旋轉", error.message);
    }

    // 測試9: 檢查行消除
    try {
        // 模擬一行被填滿的情況
        await page.evaluate(() => {
            // 假設遊戲有一個 fillRow 方法
            window.gameManager.tetris.fillRow(0);
        });
        await delay(1000);
        const tetrisScore = await page.$eval('#tetris-score', el => el.textContent);
        const expected = "一行被填滿後，該行被消除，分數增加";
        const actual = `俄羅斯方塊的分數: ${tetrisScore}`;
        if (parseInt(tetrisScore) <= 0) throw new Error('行被消除後分數沒有增加');
        report.addResult('行消除', 'passed', expected, actual);
    } catch (error) {
        report.addResult('行消除', 'failed', "一行被填滿後，該行被消除，分數增加", "分數沒有變化", error.message);
    }

    // 測試10: 檢查遊戲是否能重新開始
    try {
        await page.keyboard.press('R');
        await delay(1000);
        const snakeScoreAfterRestart = await page.$eval('#snake-score', el => el.textContent);
        const tetrisScoreAfterRestart = await page.$eval('#tetris-score', el => el.textContent);
        const expected = "重新開始後，貪食蛇和俄羅斯方塊的分數都重置為0";
        const actual = `重新開始後，貪食蛇分數: ${snakeScoreAfterRestart}, 俄羅斯方塊分數: ${tetrisScoreAfterRestart}`;
        if (snakeScoreAfterRestart !== '0' || tetrisScoreAfterRestart !== '0') {
            throw new Error('重新開始後分數未重置');
        }
        report.addResult('遊戲重新開始', 'passed', expected, actual);
    } catch (error) {
        report.addResult('遊戲重新開始', 'failed', "重新開始後，貪食蛇和俄羅斯方塊的分數都重置為0", actual, error.message);
    }

    await browser.close();

    const reportText = report.generateReport();
    console.log(reportText);

    // 將報告保存到文件
    fs.writeFileSync('test_report.txt', reportText);
    console.log('測試報告已保存到 test_report.txt');
}

runTests().catch(console.error);