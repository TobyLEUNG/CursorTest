class InputHandler {
    constructor(gameManager) {
        this.gameManager = gameManager;
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        console.log("InputHandler initialized");
    }

    handleKeyPress(event) {
        console.log("Key pressed:", event.key);
        if (this.gameManager.currentMode === 'snake') {
            switch (event.key) {
                case 'ArrowUp':
                    this.gameManager.snake.changeDirection('up');
                    break;
                case 'ArrowDown':
                    this.gameManager.snake.changeDirection('down');
                    break;
                case 'ArrowLeft':
                    this.gameManager.snake.changeDirection('left');
                    break;
                case 'ArrowRight':
                    this.gameManager.snake.changeDirection('right');
                    break;
            }
        } else if (this.gameManager.currentMode === 'tetris') {
            switch (event.key) {
                case 'ArrowUp':
                    this.gameManager.tetris.rotate();
                    break;
                case 'ArrowDown':
                    this.gameManager.tetris.moveDown();
                    this.gameManager.scoreboard.addTetrisScore(1); // 快速下移得分
                    break;
                case 'ArrowLeft':
                    this.gameManager.tetris.moveLeft();
                    break;
                case 'ArrowRight':
                    this.gameManager.tetris.moveRight();
                    break;
                case ' ':
                    this.gameManager.tetris.drop();
                    this.gameManager.scoreboard.addTetrisScore(5); // 快速下落得分
                    break;
            }
        }
        event.preventDefault(); // 防止箭頭鍵和空格鍵滾動頁面
    }
}
