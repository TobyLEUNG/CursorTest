class Snake {
    constructor(gameManager) {
        this.gameManager = gameManager;
        this.moveInterval = 1000; // 1秒移动一次
        this.moveCounter = 0;
        this.reset();
    }

    reset() {
        this.body = [{ x: 5, y: 5 }];
        this.direction = 'right';
        this.nextDirection = 'right';
        console.log("Snake reset, initial direction:", this.direction);
    }

    update(deltaTime) {
        this.moveCounter += deltaTime;
        if (this.moveCounter < this.moveInterval / this.gameManager.speed) {
            return; // 如果还没到移动时间，直接返回
        }
        this.moveCounter = 0;

        // 更新实际方向
        this.direction = this.nextDirection;

        console.log("Snake updating, current direction:", this.direction);
        const head = { ...this.body[0] };
        switch (this.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }
        this.body.unshift(head);

        if (this.checkFruitCollision(head)) {
            console.log("Snake ate fruit");
            this.gameManager.scoreboard.addSnakeScore(10);
            this.gameManager.generateFruit();
            // 吃到水果后切换到俄罗斯方块模式，但不重置蛇的状态
            this.gameManager.switchMode();
        } else {
            this.body.pop();
        }

        if (this.checkBoundaryCollision(head) || this.checkSelfCollision(head)) {
            console.log("Snake collision detected");
            this.gameManager.restart(); // 碰撞后重新开始游戏
        }
    }

    checkFruitCollision(head) {
        return head.x === this.gameManager.fruit.x && head.y === this.gameManager.fruit.y;
    }

    checkBoundaryCollision(head) {
        return head.x < 0 || head.x >= this.gameManager.canvas.width / this.gameManager.gridSize ||
               head.y < 0 || head.y >= this.gameManager.canvas.height / this.gameManager.gridSize;
    }

    checkSelfCollision(head) {
        return this.body.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    }

    changeDirection(newDirection) {
        const opposites = { up: 'down', down: 'up', left: 'right', right: 'left' };
        if (newDirection !== opposites[this.direction]) {
            this.nextDirection = newDirection;
            console.log("Snake direction changed to:", newDirection);
        } else {
            console.log("Invalid direction change attempted:", newDirection);
        }
    }
}