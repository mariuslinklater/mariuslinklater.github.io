// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let sethKinstleImg;

function preload() {
  sethKinstleImg = loadImage('sethKinstle.jpg');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(sethKinstleImg, mouseX, mouseY, sethKinstleImg.width * 2, sethKinstleImg.height * 2);
}
