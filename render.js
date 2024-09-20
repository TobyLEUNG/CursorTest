class Render {
    constructor(gameManager) {
        this.gameManager = gameManager;
    }

    draw() {
        const { ctx, canvas, gridSize, currentMode, snake, tetris, fruit, gridWidth, gridHeight } = this.gameManager;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (currentMode === 'snake') {
            this.drawSnake(snake);
            this.drawFruit(fruit);
        } else {
            this.drawTetris(tetris);
        }

        // 繪製速度
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`速度: ${this.gameManager.speed.toFixed(1)}x`, 10, 30);

        // 繪製分界線，如果需要的話
        /*
        const middleY = this.gameManager.canvas.height / 2;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, middleY);
        ctx.lineTo(this.gameManager.canvas.width, middleY);
        ctx.stroke();
        */
    }

    drawSnake(snake) {
        const { ctx, gridSize } = this.gameManager;
        ctx.fillStyle = 'green';
        snake.body.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        });
    }

    drawFruit(fruit) {
        if (!fruit) {
            console.log("No fruit to draw");
            return;
        }
        const { ctx, gridSize } = this.gameManager;
        ctx.fillStyle = 'red';
        ctx.fillRect(fruit.x * gridSize, fruit.y * gridSize, gridSize, gridSize);
        console.log("Fruit drawn at:", fruit);
    }

    drawTetris(tetris) {
        const { ctx, gridSize, gridWidth, gridHeight } = this.gameManager;
        // 繪製已放置的方塊
        tetris.grid.forEach((row, y) => {
            row.forEach((color, x) => {
                if (color) {
                    ctx.fillStyle = color;
                    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
                }
            });
        });

        // 繪製當前方塊
        if (tetris.currentPiece) {
            ctx.fillStyle = tetris.currentPiece.color;
            tetris.currentPiece.shape.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell) {
                        ctx.fillRect(
                            (tetris.currentPiece.x + x) * gridSize,
                            (tetris.currentPiece.y + y) * gridSize,
                            gridSize,
                            gridSize
                        );
                    }
                });
            });
        }
    }
}