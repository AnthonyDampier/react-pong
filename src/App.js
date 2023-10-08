import React, { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  
  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 10,
      speedX: 10,
      speedY: 10,
    };

    const paddleHeight = 60;
    const paddleWidth = 10;
    const playerOne = { y: (canvas.height - paddleHeight) / 2 };
    const playerTwo = { y: (canvas.height - paddleHeight) / 2 };

    // const draw = () => {
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);

    //   // Draw ball
    //   ctx.beginPath();
    //   ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    //   ctx.fillStyle = "white";
    //   ctx.fill();

    //   // Draw paddles
    //   ctx.fillRect(0, playerOne.y, paddleWidth, paddleHeight);
    //   ctx.fillRect(canvas.width - paddleWidth, playerTwo.y, paddleWidth, paddleHeight);

    //   ball.x += ball.speedX;
    //   ball.y += ball.speedY;

    //   // Ball collision with top and bottom
    //   if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    //     ball.speedY = -ball.speedY;
    //   }

    //   // Ball collision with paddles
    //   if (
    //     (ball.x - ball.radius < paddleWidth && ball.y > playerOne.y && ball.y < playerOne.y + paddleHeight) ||
    //     (ball.x + ball.radius > canvas.width - paddleWidth && ball.y > playerTwo.y && ball.y < playerTwo.y + paddleHeight)
    //   ) {
    //     ball.speedX = -ball.speedX;
    //   }

    //   requestAnimationFrame(draw);
    // };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Set font for emoji ball
      ctx.font = '40px Arial'; // Adjust the font size based on your desired ball size
  
      // Draw ball using emoji
      ctx.fillText('🎾', ball.x - 20, ball.y + 15); // Adjust the offset values (-20 and +15) to position the emoji correctly
  
      // Draw paddles
      ctx.fillRect(0, playerOne.y, paddleWidth, paddleHeight);
      ctx.fillRect(canvas.width - paddleWidth, playerTwo.y, paddleWidth, paddleHeight);
  
      ball.x += ball.speedX;
      ball.y += ball.speedY;
  
      // Ball collision with top and bottom
      if (ball.y + 20 > canvas.height || ball.y - 20 < 0) { // Adjust the offset value (20) based on half the size of the emoji
          ball.speedY = -ball.speedY;
      }
  
      // Ball collision with paddles
      if (
          (ball.x - 20 < paddleWidth && ball.y > playerOne.y && ball.y < playerOne.y + paddleHeight) ||
          (ball.x + 20 > canvas.width - paddleWidth && ball.y > playerTwo.y && ball.y < playerTwo.y + paddleHeight)
      ) { // Adjust the offset value (20) based on half the size of the emoji
          ball.speedX = -ball.speedX;
      }
  
      requestAnimationFrame(draw);
  };

    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          playerTwo.y -= 20;
          break;
        case "ArrowDown":
          playerTwo.y += 20;
          break;
        case "w":
          playerOne.y -= 20;
          break;
        case "s":
          playerOne.y += 20;
          break;
        default:
          break;
      }
    });

    draw();
  }, [gameStarted]);

  return (
    <div className="App">
      {!gameStarted ? (
        <div>
          <h2>How to Play:</h2>
          <p>Player One: Use 'W' and 'S' to move up and down</p>
          <p>Player Two: Use ArrowUp and ArrowDown to move up and down</p>
          <button onClick={() => setGameStarted(true)}>Start Game</button>
        </div>
      ) : (
        <canvas ref={canvasRef} width={800} height={400} />
      )}
    </div>
  );
};


