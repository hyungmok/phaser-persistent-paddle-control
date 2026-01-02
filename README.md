# Phaser.js - Persistent Paddle Control Demo

This repository demonstrates a common solution in Phaser.js for a frequent problem: how to continue tracking the mouse/pointer for game controls (like a paddle) even when the cursor leaves the game canvas.

I apologize for the previous attempt where the files were not committed. This repository now contains the complete, working code.

## The Problem

By default, Phaser's `this.input.on('pointermove', ...)` event listener within a scene only fires when the pointer is *over the game's canvas*. If a player is controlling a paddle at the bottom of the screen and their mouse moves off the canvas, the game loses track of the pointer, and the paddle stops moving. This can be a frustrating user experience, especially in fast-paced games.

## The Solution

The solution is to listen to the **global input manager**: `this.input.manager.on('pointermove', ...)` or its scene-level equivalent `this.input.on('pointermove', ...)`. 

This listener tracks the mouse position across the entire HTML document, not just the canvas. This ensures that your game always knows where the cursor is, allowing for seamless control.

The key line of code in `game.js` is:
```javascript
this.input.on('pointermove', (pointer) => {
    // We still want to clamp the paddle's position within the game's bounds
    const paddleX = Phaser.Math.Clamp(pointer.x, 50, this.sys.game.config.width - 50);
    this.paddle.x = paddleX - 50; // Adjust for the paddle's width
});
```
We use `Phaser.Math.Clamp` to ensure the paddle doesn't move outside the visible game boundaries, even though we're tracking the mouse globally.

## How to Run the Game

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/hyungmok/phaser-persistent-paddle-control.git
    ```
2.  **Navigate to the directory:**
    ```bash
    cd phaser-persistent-paddle-control
    ```
3.  **Run a local web server.**
    You cannot simply open `index.html` in your browser due to security restrictions (CORS). You need a simple local server.
    *   If you have Python 3, run:
        ```bash
        python -m http.server
        ```
    *   If you have Node.js and `serve` installed, run:
        ```bash
        serve .
        ```
4.  **Open your browser** and go to `http://localhost:8000` (or the address provided by your server).

You should now see the game running.
