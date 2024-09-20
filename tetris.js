class Tetris {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.grid = [];
        this.currentPiece = null;
        this.dropCounter = 0;
        this.dropInterval = 1000; // 每秒下落一格
        this.colors = [
            '#FF0D72', '#0DC2FF', '#0DFF72', '#F538FF',
            '#FF8E0D', '#FFE138', '#3877FF'
        ];
        this.pieceCount = 0; // 記錄放置的方塊數
        this.reset();
    }

    reset() {
        const gridWidth = this.gameManager.gridWidth; // 固定 gridWidth = 20
        const gridHeight = this.gameManager.gridHeight; // 固定 gridHeight = 30
        this.grid = Array(gridHeight).fill().map(() => Array(gridWidth).fill(0));
        this.currentPiece = null;
        this.pieceCount = 0; // 重置方塊計數
        console.log("Tetris reset");
        this.generateNewPiece(); // 重新生成方塊
    }

    update(deltaTime) {
        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval / this.gameManager.speed) {
            this.moveDown();
            this.dropCounter = 0;
        }
    }

    moveDown() {
        if (this.canMove(0, 1)) {
            this.currentPiece.y++;
        } else {
            this.placePiece();
            this.clearLines();
            this.pieceCount++;
            this.gameManager.switchMode(); // 切換回貪食蛇模式
        }
    }

    generateNewPiece() {
        const shapes = [
            [[1, 1, 1, 1]], // I
            [[1, 1, 1], [0, 1, 0]], // T
            [[1, 1], [1, 1]], // O
            [[0, 1, 1], [1, 1, 0]], // S
            [[1, 1, 0], [0, 1, 1]], // Z
            [[1, 1, 1], [1, 0, 0]], // L
            [[1, 1, 1], [0, 0, 1]]  // J
        ];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.currentPiece = {
            shape,
            color,
            x: Math.floor((this.gameManager.gridWidth / 2) - (Math.floor(shape[0].length / 2))),
            y: 0
        };

        // 確認生成位置不與已有方塊重疊
        if (!this.canMove(0, 0)) {
            this.gameManager.gameOver();
            return;
        }

        console.log("New piece generated:", this.currentPiece);
    }

    moveLeft() {
        if (this.canMove(-1, 0)) {
            this.currentPiece.x--;
            console.log("Piece moved left");
        }
    }

    moveRight() {
        if (this.canMove(1, 0)) {
            this.currentPiece.x++;
            console.log("Piece moved right");
        }
    }

    rotate() {
        const rotated = this.currentPiece.shape[0].map((_, i) =>
            this.currentPiece.shape.map(row => row[i]).reverse()
        );
        if (this.canRotate(rotated)) {
            this.currentPiece.shape = rotated;
            console.log("Piece rotated");
        }
    }

    canRotate(rotatedShape) {
        for (let y = 0; y < rotatedShape.length; y++) {
            for (let x = 0; x < rotatedShape[y].length; x++) {
                if (rotatedShape[y][x]) {
                    const newX = this.currentPiece.x + x;
                    const newY = this.currentPiece.y + y;
                    if (newX < 0 || newX >= this.gameManager.gridWidth || newY >= this.gameManager.gridHeight || (newY >= 0 && this.grid[newY][newX])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    drop() {
        while (this.canMove(0, 1)) {
            this.currentPiece.y++;
        }
        this.placePiece();
        this.clearLines();
        this.gameManager.switchMode();
    }

    canMove(offsetX, offsetY) {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x]) {
                    const newX = this.currentPiece.x + x + offsetX;
                    const newY = this.currentPiece.y + y + offsetY;
                    if (newX < 0 || newX >= this.gameManager.gridWidth || newY >= this.gameManager.gridHeight || (newY >= 0 && this.grid[newY][newX])) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    placePiece() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x]) {
                    this.grid[this.currentPiece.y + y][this.currentPiece.x + x] = this.currentPiece.color;
                }
            }
        }
        console.log("Piece placed");
        this.clearLines(); // 確保放置方塊後檢查並消除滿行
        this.generateNewPiece(); // 生成新方塊
    }

    clearLines() {
        let linesCleared = 0;
        for (let y = this.grid.length - 1; y >= 0; y--) {
            if (this.grid[y].every(cell => cell !== 0)) {
                this.grid.splice(y, 1); // 刪除滿行
                this.grid.unshift(Array(this.gameManager.gridWidth).fill(0)); // 在頂部新增一行空行
                linesCleared++;
                y++; // 因為上方行下移，需要重新檢查當前行
            }
        }
        if (linesCleared > 0) {
            console.log("Lines cleared:", linesCleared);
            this.gameManager.scoreboard.addTetrisScore(linesCleared * 10); // 每行消除得10分
            // 如果需要，可以在此處調整下落速度
        }
        return linesCleared;
    }
}
