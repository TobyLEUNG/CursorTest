const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'Test', 'test-log.txt');

exec('npm test', (error, stdout, stderr) => {
  if (error) {
    console.error(`執行測試時發生錯誤: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`測試錯誤輸出: ${stderr}`);
    return;
  }

  fs.writeFileSync(logFile, stdout);
  console.log('測試完成，日誌已生成。');
});