// inputHandler.test.js 測試代碼
const InputHandler = require('../inputHandler');

describe('InputHandler', () => {
    let inputHandler;

    beforeEach(() => {
        inputHandler = new InputHandler();
    });

    test('should handle snake input correctly', () => {
        const snake = { move: jest.fn() };
        inputHandler.handleInput('ArrowRight', 'snake', snake);
        expect(snake.move).toHaveBeenCalledWith('right');
    });

    test('should handle tetris input correctly', () => {
        const tetris = { moveBlock: jest.fn() };
        inputHandler.handleInput('ArrowLeft', 'tetris', tetris);
        expect(tetris.moveBlock).toHaveBeenCalledWith('left');
    });

    // ... 其他測試 ...
});