class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.paddle = null;
        this.ball = null;
        this.scoreText = null;
        this.score = 0;
    }

    create() {
        // Create the paddle
        this.paddle = this.physics.add.image(400, 550, 'paddle').setImmovable();
        this.paddle.setCollideWorldBounds(true);
        // We are creating a simple texture for the paddle and ball on the fly
        this.paddle.setTexture(this.createTexture('paddleTexture', 100, 20, '#ffffff'));

        // Create the ball
        this.ball = this.physics.add.image(400, 300, 'ball');
        this.ball.setCircle(10);
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1, 1);
        this.ball.setVelocity(200, 200);
        this.ball.setTexture(this.createTexture('ballTexture', 20, 20, '#ff4444'));

        // Create score text
        this.scoreText = this.add.text(16, 16, 'Move the mouse left and right', { fontSize: '24px', fill: '#fff' });

        // Physics collisions
        this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);
        
        // --- The Key Part for Persistent Control ---
        // This listener is on the global input manager, which listens to the whole document.
        // This means even if the pointer is outside the game canvas, as long as the window is in focus,
        // the 'pointermove' event will fire and update the paddle's position.
        this.input.on('pointermove', (pointer) => {
            // We constrain the paddle's position to stay within the game's world bounds.
            this.paddle.x = Phaser.Math.Clamp(pointer.x, this.paddle.width / 2, this.physics.world.bounds.width - this.paddle.width / 2);
        });

        this.add.text(this.cameras.main.width / 2, 30, '커서가 게임 영역 밖으로 나가도 패들은 계속 움직입니다.', {
            fontSize: '16px',
            fill: '#00ff00'
        }).setOrigin(0.5);
    }

    update() {
        // Reset ball if it goes off the bottom of the screen
        if (this.ball.y > 600) {
            this.resetBall();
        }
    }

    hitPaddle(ball, paddle) {
        let diff = 0;
        if (ball.x < paddle.x) {
            // Ball is on the left-hand side of the paddle
            diff = paddle.x - ball.x;
            ball.setVelocityX(-10 * diff);
        } else if (ball.x > paddle.x) {
            // Ball is on the right-hand side of the paddle
            diff = ball.x - paddle.x;
            ball.setVelocityX(10 * diff);
        } else {
            // Ball is perfectly in the middle
            ball.setVelocityX(2 + Math.random() * 8);
        }
    }
    
    resetBall() {
        this.ball.setPosition(400, 300);
        this.ball.setVelocity(200, 200);
    }
    
    // Helper to create simple rectangle textures
    createTexture(key, width, height, color) {
        let graphics = this.make.graphics({ x: 0, y: 0, add: false });
        graphics.fillStyle(Phaser.Display.Color.HexStringToColor(color).color, 1);
        graphics.fillRect(0, 0, width, height);
        graphics.generateTexture(key, width, height);
        graphics.destroy();
        return key;
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [GameScene]
};

const game = new Phaser.Game(config);