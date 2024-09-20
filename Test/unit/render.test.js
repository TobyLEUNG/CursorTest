// render.test.js 測試代碼
const Render = require('../render');

describe('Render', () => {
    let render;

    beforeEach(() => {
        render = new Render();
    });

    test('should render snake correctly', () => {
        const snake = { body: [{ x: 1, y: 1 }] };
        render.renderSnake(snake);
        // 檢查畫布上的蛇是否正確渲染
    });

    test('should render tetris block correctly', () => {
        const tetris = { currentBlock: { position: { x: 1, y: 1 }, shape: [[1]] } };
        render.renderTetris(tetris);
        // 檢查畫布上的方塊是否正確渲染
    });

    // ... 其他測試 ...
});