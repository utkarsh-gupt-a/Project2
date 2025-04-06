let speedx = 3.3;
let speedy = 3.6;

let loc = {
  x: 200,
  y: 200,
};

let score = {
  x: 0,
};

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

  // Flash overlay
  if (flashAlpha > 0) {
    fill(255, 255, 255, flashAlpha);
    rect(0, 0, width, height);
    flashAlpha -= 10;
  }

  stroke(100);
  strokeWeight(2);
  line(0, height / 2, width, height / 2);

  noStroke();
  fill(200, 30, 60);
  prevPaddleX = paddleX;
  paddleX = constrain(mouseX - 100, 0, width - 200);
  paddleSpeed = paddleX - prevPaddleX;
  rect(paddleX, 0, 200, 10, 10);
  rect(paddleX, height - 10, 200, 10, 10);

  fill(255);
  ellipse(loc.x, loc.y, 20);

  textSize(28);
  textAlign(CENTER);
  fill(255, 255, 255, 180);
  text("Score = " + score.x, width / 2, height / 3);

  if (loc.x <= 10 || loc.x >= width - 10) {
    speedx = -speedx;
  }

  loc.x += speedx;

  if (
    loc.x < paddleX + 200 &&
    loc.x > paddleX &&
    (loc.y <= 20 || loc.y >= height - 20)
  ) {
    speedy = -(speedy * 1.1);
    speedx += paddleSpeed * 0.2;
    score.x += 10;
    flashAlpha = 10; // start flash
  }

  loc.y += speedy;

  if (loc.y < 0 || loc.y > height) {
    speedx = 0;
    speedy = 0;
    textAlign(CENTER);
    textSize(32);
    fill(255);
    background(20);
    text("🎮 GAME OVER", width / 2, height / 2.4);
    text("Your final score: " + score.x, width / 2, height / 2);
    text("Click 'Restart' to play again!", width / 2, height / 1.85);
    noLoop();

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

function restartGame() {
  speedx = 3.3;
  speedy = 3.6;
  loc = { x: 200, y: 200 };
  score = { x: 0 };
  gameOver = false;
  flashAlpha = 0;
  restartBtn.remove();
  loop();
}
