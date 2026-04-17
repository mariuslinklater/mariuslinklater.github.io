// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Ball {
  constructor(x, y,){
    this.x = x;
    this.y = y;
    this.radius = random(15, 40);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.radius * 2);
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.y - this.radius < 0 || this.y + this.radius > height) {
      this.dy *= -1;
    }

    if (this.x - this.radius < 0 || this.x + this.radius > width) {
      this.dx *= -1;
    }
  }

  collide(otherBall) {
    let radiiSum = this.radius + otherBall.radius;
    let distanceApart = dist(this.x, this.y , otherBall.x, otherBall.y);
    if (radiiSum > distanceApart) {
      let balldx = this.dx;
      let balldy = this.dy;
      this.dx = otherBall.dx;
      this.dy = otherBall.dy;
      otherBall.dx = balldx;
      otherBall.dx = balldy;
    }
  }
}

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let ball of ballArray) {
    ball.display();
    for (let otherBall of ballArray) {
      if (ball !== otherBall) {
        ball.collide(otherBall); 
      }      
    }
    ball.move();
  }
}

function mousePressed() {
  let someBall = new Ball(mouseX, mouseY);
  ballArray.push(someBall);
}