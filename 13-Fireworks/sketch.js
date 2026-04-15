// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

class Particle {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.dx = random(-5,5);
    this.dy = random(-5,5);
    this.radius = 4;
    this.opacity = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.radius*2);
  }

  update() {
    //move
    this.x += this.dx;
    this.y += this.dy;

    //fade away over time
    this.opacity -= 4;
  }
}

let theFireworks = [];
const NUMBER_OF_PARTICLES_PER_CLICK = 100;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background('black');
  for (let aFirework of theFireworks){
    aFirework.update();
    aFirework.display();
  }
}

function mousePressed() {
  for (let i = 0; i < NUMBER_OF_PARTICLES_PER_CLICK; i++) {
    let someFirework = new Particle(mouseX, mouseY);
    theFireworks.push(someFirework); 
  }
  
}
