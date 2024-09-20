// snake.test.js 測試代碼
const Snake = require('../snake.js'); // 指定扩展名

describe('Snake', () => {
    let snake;

    beforeEach(() => {
        snake = new Snake();
    });

    test('should initialize snake correctly', () => {
        expect(snake.body.length).toBeGreaterThan(0);
    });

    test('should move snake correctly', () => {
        const initialPosition = snake.body[0];
        snake.move('right');
        expect(snake.body[0]).not.toEqual(initialPosition);
    });

    test('should grow snake after eating fruit', () => {
        const initialLength = snake.body.length;
        snake.eatFruit();
        expect(snake.body.length).toBe(initialLength + 1);
    });

    // ... 其他測試 ...
});