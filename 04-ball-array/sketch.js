// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for(let ball of ballArray) {
    //move
    ball.x += ball.dx;
    ball.y += ball.dy;

    //display
    circle(ball.x, ball.y, ball.radius * 2);
  }
}

function spawnBall() {
  let theBall = {
    x: random(width),
    y: random(height),
    dx: random(-6,6),
    dy: random(-6,6),
    radius: random(10,41)
  };
  ballArray.push(theBall);
}

function mousePressed(){
  spawnBall();
}