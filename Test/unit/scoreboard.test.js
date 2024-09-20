// scoreboard.test.js 測試代碼
const Scoreboard = require('../scoreboard');

describe('Scoreboard', () => {
    let scoreboard;

    beforeEach(() => {
        scoreboard = new Scoreboard();
    });

    test('should initialize scoreboard correctly', () => {
        expect(scoreboard.snakeScore).toBe(0);
        expect(scoreboard.tetrisScore).toBe(0);
    });

    test('should update snake score correctly', () => {
        scoreboard.updateSnakeScore(10);
        expect(scoreboard.snakeScore).toBe(10);
    });

    test('should update tetris score correctly', () => {
        scoreboard.updateTetrisScore(20);
        expect(scoreboard.tetrisScore).toBe(20);
    });

    test('should reset scores correctly', () => {
        scoreboard.reset();
        expect(scoreboard.snakeScore).toBe(0);
        expect(scoreboard.tetrisScore).toBe(0);
    });

    // ... 其他測試 ...
});