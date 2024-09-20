// gameManager.test.js 測試代碼
const GameManager = require('../gameManager');

describe('GameManager', () => {
    let gameManager;

    beforeEach(() => {
        gameManager = new GameManager();
    });

    test('should initialize game state correctly', () => {
        expect(gameManager.state).toBe('snake');
    });

    test('should switch to tetris mode after eating fruit', () => {
        gameManager.switchMode('tetris');
        expect(gameManager.state).toBe('tetris');
    });

    test('should restart the game', () => {
        gameManager.restart();
        expect(gameManager.state).toBe('snake');
        expect(gameManager.score).toBe(0);
    });

    // ... 其他測試 ...
});