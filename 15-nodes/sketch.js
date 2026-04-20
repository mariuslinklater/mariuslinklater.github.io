// Connected nodes demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theNodes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let node of theNodes){
    node.update();
    node.connectTo(theNodes);
    
  }
  for (let node of theNodes){
    node.display(); 
  }  
}

function mousePressed() {
  let somePoint = new MovingPoint(mouseX, mouseY);
  theNodes.push(somePoint);
}


class MovingPoint {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.color = color(random(255), random(255), random(255));
    this.speed = 5;
    this.reach = 200;
    this.maxRadius = 50;
    this.minRadius = 15;
  }

  display() {
    stroke(this.color);
    fill(this.color);
    circle(this.x, this.y, this.radius * 2);
  }

  update() {
    this.move();
    this.wrapAroundScreen();
    this.AdjustSizeBasedOnMouse();
  }

  move() {
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);


    //scales dx and dy value
    dx = map(dx, 0, 1, - this.speed, this.speed);
    dy = map(dy, 0, 1, - this.speed, this.speed);
    // move the point

    this.x += dx;
    this.y += dy;


    // move on time axis
    this.xTime+= 0.01;
    this.yTime+= 0.01;

  }
  wrapAroundScreen(){
    if(this.x < 0 + this.radius) {
      this.x += width;
    }
    if(this.x > width -this.radius) {
      this.x -= width;
    }
    if (this.y < 0 + this.radius) {
      this.y += height;
    }
    if (this.y > height - this.radius) {
      this.y -= height;
    }
  }

  connectTo(nodeArray) {
    for(let theNode of nodeArray) {
      if (this !== theNode) {
        let distanceApart = dist(this.x, this.y, theNode.x, theNode.y);
        if(distanceApart < this.reach){
          
          line(this.x, this.y, theNode.x, theNode.y);
        }        
      }          
    }
  }

  AdjustSizeBasedOnMouse(){
    let mouseDistance = dist(mouseX, mouseY, this.x, this.y);
    if(mouseDistance < this.reach) {
      let theSize = map(mouseDistance, 0, this.reach, this.maxRadius, this.minRadius);
      this.radius = theSize;
    }
  }
}