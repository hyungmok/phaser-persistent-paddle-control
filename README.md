# Phaser.js Persistent Paddle Control

This project is a simple Phaser.js game that demonstrates how to maintain control of a paddle with the mouse, even when the cursor moves outside of the game's canvas area.

This is a direct answer to the user query: "커서가 게임 영역을 벗어나면 패드 컨트롤이 안 되는데 이거 수정할 수 있어?" (The paddle control doesn't work when the cursor leaves the game area, can you fix this?).

## How it Works

The key to the solution lies in this piece of code in `game.js`:

```javascript
this.input.on('pointermove', (pointer) => {
    this.paddle.x = Phaser.Math.Clamp(pointer.x, this.paddle.width / 2, this.physics.world.bounds.width - this.paddle.width / 2);
});
```

- **`this.input.on(...)`**: We are attaching an event listener to Phaser's global Input Manager.
- **`'pointermove'`**: This event fires whenever the mouse (or pointer) is moved.
- **Global Listener**: By default, Phaser's input manager listens for events on the entire HTML document, not just the `<canvas>` element. This is why it continues to receive updates even when the cursor is outside the game's visual boundary.
- **Updating Paddle Position**: Inside the listener, we set the `paddle.x` position to the `pointer.x` position, ensuring it follows the mouse horizontally.
- **`Phaser.Math.Clamp(...)`**: This is a helper function to ensure the paddle's position is clamped (or constrained) within the game's world bounds, preventing it from moving off-screen.

## How to Run

1.  Clone this repository or download the files.
2.  You cannot run this game by simply opening `index.html` in your browser due to browser security restrictions (CORS policy).
3.  You must serve the files through a local web server.
    - If you have Python installed, you can run `python -m http.server` (for Python 3) or `python -m SimpleHTTPServer` (for Python 2) in the project directory.
    - If you have Node.js and `http-server` installed, you can run `http-server`.
    - You can also use the "Live Server" extension in Visual Studio Code.
4.  Once the server is running, open your web browser and navigate to the local server's address (e.g., `http://localhost:8000`).

You will see a simple game where a ball bounces off a paddle that you control with your mouse. Notice that you can move your mouse far outside the game's black box, and the paddle will still respond perfectly.