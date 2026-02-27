// Interactive Scene
// Marius Linklater
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let screen; // changes between menu and game and stuff, state variable

let character = {
  characterX: windowWidth/2,
  characterY: windowHeight/2,
  speed: 5
};

let characterImage;
let aisle1Image;
let aisle2Image;
let aisle3Image;

function preload(){
  characterImage = loadImage('character.png');
  aisle1Image = loadImage('storeAisle1.jpg');
  aisle2Image = loadImage('storeAisle2.jpg');
  aisle3Image = loadImage('storeAisle3.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  screen = 'menu';
}

function draw() {
  drawBackground();
  drawCharacter();
}

function drawBackground() {
  if (screen === 'menu') {
    drawMenu();
  }
  if (screen === 'intro') {
    introSequence();
  }
  if (screen === 'aisle1') {
    drawAisle1();
  }
  if (screen === 'aisle2') {
    drawAisle2();
  }
  if (screen === 'aisle3') {
    drawAisle3();
  }
}

function drawMenu(){

}

function introSequence() {

}

function drawAisle1() {

}

function drawAisle2() {

}

function drawAisle3() {

}

function drawCharacter() {
  if (screen !== 'menu') {
    image(characterImage, character.characterX, character.characterY, characterImage.width/2, characterImage.height/2);
    if(keyIsDown(87)) { //w
      character.characterY -= character.speed;
    }
    if(keyIsDown(83)) { //s
      character.characterY += character.speed;
    }  if(keyIsDown(68)) { //d
      character.characterX += character.speed;
    }  if(keyIsDown(65)) { //a
      character.characterX -= character.speed;
    }
  }
}