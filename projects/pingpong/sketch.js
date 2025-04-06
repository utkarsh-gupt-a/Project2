let speedx = 3.3;
let speedy = 3.6;

let loc = {
  x: 200,
  y: 200,
};

let score = {
  x: 0,
};

// Track paddle movement to influence ball direction
let paddleX = 0;
let prevPaddleX = 0;
let paddleSpeed = 0;

let gameOver = false;
let restartBtn;

let flashAlpha = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  if (gameOver) return;

  background(20);

  // Glow effect just behind the ball
  if (flashAlpha > 1) {
    noStroke();
    fill(255, 255, 10, flashAlpha);
    ellipse(loc.x, loc.y, 40); // glow behind the ball
    flashAlpha *= 0.9;
  }


  stroke(100);
  strokeWeight(2);
  line(0, height / 2, width, height / 2); // center guide line

  // Draw paddles at top and bottom
  noStroke();
  fill(200, 30, 60);
  prevPaddleX = paddleX;
  paddleX = constrain(mouseX - 100, 0, width - 200);
  paddleSpeed = paddleX - prevPaddleX;
  rect(paddleX, 0, 200, 10, 10);
  rect(paddleX, height - 10, 200, 10, 10);

  // Draw ball
  fill(255);
  ellipse(loc.x, loc.y, 20);

  // Score display
  textSize(28);
  textAlign(CENTER);
  fill(255, 255, 255, 180);
  text("Score = " + score.x, width / 2, height / 3);

  // Bounce off left/right walls
  if (loc.x <= 10 || loc.x >= width - 10) {
    speedx = -speedx;
  }

  loc.x += speedx;

  // Collision with top/bottom paddles
  if (
    loc.x < paddleX + 200 &&
    loc.x > paddleX &&
    (loc.y <= 20 || loc.y >= height - 20)
  ) {
    speedy = -(speedy * 1.1); // reverse + increase speed
    speedx += paddleSpeed * 0.2; // affect angle based on paddle movement
    score.x += 10;
    flashAlpha = 45 ; // start smooth flash
  }

  loc.y += speedy;

  // Game over condition
  if (loc.y < 0 || loc.y > height) {
    speedx = 0;
    speedy = 0;

    background(20);
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text("🎮 GAME OVER", width / 2, height / 2.4);
    text("Your final score: " + score.x, width / 2, height / 2);
    text("Click 'Restart' to play again!", width / 2, height / 1.85);
    noLoop();

    // Create Restart Button
    restartBtn = createButton("Restart");
    restartBtn.position(width / 2 - 60, height / 1.75);
    restartBtn.style("font-size", "18px");
    restartBtn.style("padding", "10px 20px");
    restartBtn.style("border-radius", "10px");
    restartBtn.style("background-color", "#28a745");
    restartBtn.style("color", "white");
    restartBtn.style("border", "none");
    restartBtn.mousePressed(restartGame);

    gameOver = true;
  }
}

// Reset the game state
function restartGame() {
  speedx = 3.3;
  speedy = 3.6;
  loc = { x: 200, y: 200 };
  score = { x: 0 };
  flashAlpha = 0;
  gameOver = false;
  restartBtn.remove();
  loop();
}
