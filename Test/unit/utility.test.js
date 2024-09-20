// utility.test.js 測試代碼
const Utility = require('../utility');

describe('Utility', () => {
    test('should generate random number correctly', () => {
        const randomNumber = Utility.randomNumber(1, 10);
        expect(randomNumber).toBeGreaterThanOrEqual(1);
        expect(randomNumber).toBeLessThanOrEqual(10);
    });

    test('should deep copy object correctly', () => {
        const obj = { a: 1, b: { c: 2 } };
        const copy = Utility.deepCopy(obj);
        expect(copy).toEqual(obj);
        expect(copy).not.toBe(obj);
    });

    // ... 其他測試 ...
});