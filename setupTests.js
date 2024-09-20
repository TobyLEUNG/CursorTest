const fs = require('fs');
const path = require('path');

const baseDir = 'C:/JS/ClaudeTest/CursorTest/SnakeT/Test';
const folders = ['unit', 'e2e'];
const unitTests = [
    'gameManager.test.js',
    'snake.test.js',
    'tetris.test.js',
    'render.test.js',
    'scoreboard.test.js',
    'inputHandler.test.js',
    'utility.test.js'
];
const e2eTests = ['gameFlow.test.js'];

const createFolder = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

const createFile = (filePath, content) => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
    }
};

// 創建文件夾
folders.forEach(folder => createFolder(path.join(baseDir, folder)));

// 創建單元測試文件
unitTests.forEach(test => {
    const filePath = path.join(baseDir, 'unit', test);
    const content = `// ${test} 測試代碼\n`;
    createFile(filePath, content);
});

// 創建端到端測試文件
e2eTests.forEach(test => {
    const filePath = path.join(baseDir, 'e2e', test);
    const content = `// ${test} 測試代碼\n`;
    createFile(filePath, content);
});

console.log('測試文件夾和文件已創建完成');