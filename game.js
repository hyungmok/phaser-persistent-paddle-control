class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.paddle = null;
    }

    preload() {
        // No assets to preload for this simple demo
    }

    create() {
        // Set background color
        this.cameras.main.setBackgroundColor('#2d2d2d');

        // Create the paddle as a simple graphics object
        this.paddle = this.add.graphics({ fillStyle: { color: 0xffffff } });
        this.paddle.fillRect(0, 0, 100, 20); // x, y, width, height

        // Center the paddle initially
        this.paddle.x = this.sys.game.config.width / 2 - 50;
        this.paddle.y = this.sys.game.config.height - 50;

        // --- The Key Solution ---
        // Listen for the 'pointermove' event on the global input manager.
        // This tracks the pointer's position across the entire page, not just the canvas.
        this.input.on('pointermove', (pointer) => {
            // We still want to clamp the paddle's position within the game's bounds
            const paddleX = Phaser.Math.Clamp(pointer.x, 50, this.sys.game.config.width - 50);
            this.paddle.x = paddleX - 50; // Adjust for the paddle's width
        });

        // Add some text to explain the concept
        this.add.text(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2,
            'Move the mouse left and right.\nThe paddle will follow even if the cursor is outside the game area.',
            {
                font: '18px Arial',
                fill: '#ffffff',
                align: 'center',
                wordWrap: { width: this.sys.game.config.width - 40 }
            }
        ).setOrigin(0.5);
    }

    update() {
        // No per-frame updates needed as the pointer event handles the logic.
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [GameScene],
    parent: 'phaser-example'
};

const game = new Phaser.Game(config);