class GameManager {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        if (!this.canvas) {
            console.error("Canvas element not found!");
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20; // 固定 gridSize
        this.gridWidth = Math.floor(this.canvas.width / this.gridSize); // 格子列數 = 400 / 20 = 20
        this.gridHeight = Math.floor(this.canvas.height / this.gridSize); // 格子行數 = 600 / 20 = 30
        this.snake = new Snake(this);
        this.tetris = new Tetris(this);
        this.render = new Render(this);
        this.scoreboard = new Scoreboard();
        this.inputHandler = new InputHandler(this);
        this.currentMode = 'snake';
        this.speed = 1;
        this.initialSpeed = 1;
        this.lastUpdateTime = 0;
        this.fruit = null;
        this.snakeMoveInterval = 200; // 每200毫秒移動一次
        this.lastSnakeMoveTime = 0;
        this.setupSpeedControl();
        // 移除 fitToWindow 和 resizeCanvas 的設置
        // this.setupFitToWindow();
        // this.resizeCanvas();
        this.generateFruit();
        // 移除窗口大小調整事件監聽
        // window.addEventListener('resize', () => this.resizeCanvas());
        console.log("GameManager initialized");
        this.isGameOver = false;
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' || e.key === 'R') {
                this.restart();
            }
        });
    }

    setupSpeedControl() {
        const speedSelect = document.getElementById('speed-select');
        if (speedSelect) {
            speedSelect.addEventListener('change', (e) => {
                this.speed = parseFloat(e.target.value);
                console.log("Speed changed to:", this.speed);
            });
        } else {
            console.warn("Speed select element not found.");
        }
    }

    // 移除或注釋掉 fitToWindow 方法
    /*
    setupFitToWindow() {
        const fitButton = document.getElementById('fit-to-window');
        if (fitButton) {
            fitButton.addEventListener('click', () => this.fitToWindow());
        } else {
            console.warn("Fit to window button not found.");
        }
    }

    fitToWindow() {
        // 移除或調整 fitToWindow 的邏輯，使其不影響 100% 視圖模式
        // 例如，關閉自動調整或重設畫布大小
        this.resizeCanvas(); // 調用 resizeCanvas 以恢復到 100% 視圖
    }
    */

    /*
    resizeCanvas() {
        // 不需要動態調整，保持固定尺寸
        console.log("resizeCanvas called, but canvas size is fixed.");
        this.render.draw();
    }
    */

    start() {
        console.log("Game started");
        this.isGameOver = false;
        this.generateFruit();
        this.lastUpdateTime = performance.now();
        this.render.draw(); // 添加初始渲染
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    gameLoop(currentTime) {
        if (this.isGameOver) return;
        const deltaTime = currentTime - this.lastUpdateTime;
        console.log(`Game loop: mode=${this.currentMode}, deltaTime=${deltaTime}`);
        this.update(deltaTime);
        this.render.draw();
        this.lastUpdateTime = currentTime;
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    update(deltaTime) {
        if (this.currentMode === 'snake') {
            this.snake.update(deltaTime);
        } else {
            this.tetris.update(deltaTime);
        }
    }

    switchMode() {
        if (this.currentMode === 'snake') {
            this.currentMode = 'tetris';
            this.tetris.generateNewPiece(); // 從頂部生成新方塊
        } else {
            this.currentMode = 'snake';
            this.generateFruit();
        }
        console.log("Switched mode to:", this.currentMode);
    }

    gameOver() {
        this.isGameOver = true;
        console.log("Game Over");
        // 可以在此添加遊戲結束畫面或其他邏輯
    }

    restart() {
        this.snake.reset();
        this.tetris.reset();
        this.scoreboard.reset();
        this.currentMode = 'snake';
        this.generateFruit();
        this.isGameOver = false;
        this.start();
    }

    generateFruit() {
        const x = Math.floor(Math.random() * this.gridWidth);
        const maxY = Math.floor(this.gridHeight / 2 - 3);
        const y = Math.floor(Math.random() * maxY);
        this.fruit = { x, y };
        console.log("Fruit generated at:", this.fruit);
        return this.fruit;
    }

    // 如果需要調整其他方法，請根據固定尺寸進行調整
}

// 確保在文件末尾有這兩行
window.addEventListener('load', () => {
    const game = new GameManager();
    game.start();
});