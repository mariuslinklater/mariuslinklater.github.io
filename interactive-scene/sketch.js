// Interactive Scene
// Marius Linklater
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let screen; // changes between menu and game and stuff, state variable
let difficulty = 'easy';

function setup() {
  createCanvas(windowWidth, windowHeight);
  screen = 'menu';
}

let character = {
  characterX: 400,
  characterY: 400,
  speed: 12
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
  menuImage = loadImage('menu.jpg');
  easyModeImage = loadImage('menuEasyMode.png');
  hardModeImage = loadImage('hardMenu.jpg');
  superHardModeImage = loadImage('superHardMenu.jpg');
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
 let diffImage = easyModeImage
 image(menuImage, 0, 0, windowWidth, windowHeight);
 image(diffImage, windowWidth/2, windowHeight/1.59, windowWidth/6, windowHeight/7.7)
 if (mouseIsPressed && mouseX > windowWidth/7 && mouseX < windowWidth/2 && mouseY > windowHeight/3 && mouseY < windowHeight/1.7) {
    screen = 'aisle1'
 }
 if (mouseIsPressed && mouseX > windowWidth/2 && mouseX < windowWidth/1.2 && mouseY > windowHeight/3 && mouseY < windowHeight/1.7){
  diffImage = hardModeImage
 }
}

function introSequence() {

}

function drawAisle1() {
  image(aisle1Image, 0, 0, windowWidth, windowHeight);
  if (character.characterX > windowWidth) {
    screen = "aisle2";
    character.characterX = 100;
  }
}

function drawAisle2() {
  image(aisle2Image, 0, 0, windowWidth, windowHeight);
  
  if (character.characterX > windowWidth) {
    screen = "aisle3";
    character.characterX = 100;
  }

    if (character.characterX < 0) {
    screen = "aisle1";
    character.characterX = windowWidth - 100;
  }
}

function drawAisle3() {
  image(aisle3Image, 0, 0, windowWidth, windowHeight);
      if (character.characterX < 0 - 100) {
    screen = "aisle2";
    character.characterX = windowWidth - 100;
    }
}

function drawCharacter() {
  if (screen !== 'menu' && screen !== 'intro') {
    image(characterImage, character.characterX, character.characterY, 360* (character.characterY/350),  540 * (character.characterY/350) );
    if(keyIsDown(87) && (character.characterY > windowHeight/2 - 400 * (character.characterY/350))) { //w
      character.characterY -= character.speed/1.6;
    }
    if(keyIsDown(83)) { //s
      character.characterY += character.speed/1.6;
    }  if(keyIsDown(68)) { //d
      character.characterX += character.speed;
    }  if(keyIsDown(65)) { //a
      character.characterX -= character.speed;
    }
  } 
}