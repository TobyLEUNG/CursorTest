class Scoreboard {
    constructor() {
        this.snakeScore = 0;
        this.tetrisScore = 0;
        this.snakeScoreElement = document.getElementById('snake-score');
        this.tetrisScoreElement = document.getElementById('tetris-score');
        this.totalScoreElement = document.getElementById('total-score');
    }

    addSnakeScore(points) {
        this.snakeScore += points;
        this.updateDisplay();
    }

    addTetrisScore(points) {
        this.tetrisScore += points;
        this.updateDisplay();
    }

    updateDisplay() {
        if (this.snakeScoreElement) this.snakeScoreElement.textContent = this.snakeScore;
        if (this.tetrisScoreElement) this.tetrisScoreElement.textContent = this.tetrisScore;
        if (this.totalScoreElement) this.totalScoreElement.textContent = this.snakeScore + this.tetrisScore;
    }

    reset() {
        this.snakeScore = 0;
        this.tetrisScore = 0;
        this.updateDisplay();
    }
}