// tetris.test.js 測試代碼
const Tetris = require('../tetris');

describe('Tetris', () => {
    let tetris;

    beforeEach(() => {
        tetris = new Tetris();
    });

    test('should initialize tetris correctly', () => {
        expect(tetris.board.length).toBeGreaterThan(0);
    });

    test('should move tetris block correctly', () => {
        const initialPosition = tetris.currentBlock.position;
        tetris.moveBlock('left');
        expect(tetris.currentBlock.position).not.toEqual(initialPosition);
    });

    test('should rotate tetris block correctly', () => {
        const initialRotation = tetris.currentBlock.rotation;
        tetris.rotateBlock();
        expect(tetris.currentBlock.rotation).not.toEqual(initialRotation);
    });

    // ... 其他測試 ...
});