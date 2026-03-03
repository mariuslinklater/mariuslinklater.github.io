// Interactive Scene
// Marius Linklater
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let screen;
let difficulty = 10000;
let diffImage = 0;
let waitTime = 5000;
let introImage = 0;
let lastSwitch;
let gulpPlayed = false;


// loads images and sounds
function preload(){
  characterImage = loadImage('character.png');
  aisle1Image = loadImage('storeAisle1.jpg');
  aisle2Image = loadImage('storeAisle2.jpg');
  aisle3Image = loadImage('storeAisle3.jpg');
  menuImage = loadImage('menu.jpg');
  easyModeImage = loadImage('menuEasyMode.png');
  hardModeImage = loadImage('hardMenu.jpg');
  superHardModeImage = loadImage('superHardMenu.jpg');
  intro1Image = loadImage('intro1.jpg');
  intro2Image = loadImage('intro2.jpg');
  intro3Image = loadImage('intro3.jpg');
  intro4Image = loadImage('intro4.jpg');
  gulpNoise = loadSound('gulp.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  screen = 'menu';
  lastSwitch = millis();
  noStroke();
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



function draw() {
  drawBackground();
  drawCharacter();
  if (screen !== 'menu' && screen !== 'intro') {
    generateSquare();
  }
}

// this is what decides what screen youre on
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

// chages background to menu and puts buttons
function drawMenu(){
  image(menuImage, 0, 0, windowWidth, windowHeight);
  diffButton();
  if (mouseIsPressed && mouseX > windowWidth/7 && mouseX < windowWidth/2 && mouseY > windowHeight/3 && mouseY < windowHeight/1.7) {
    screen = 'intro';
  }
  if (mouseIsPressed && mouseX > windowWidth/2 && mouseX < windowWidth/1.2 && mouseY > windowHeight/3 && mouseY < windowHeight/1.7){
    diffImage ++;
    if (diffImage > 2){
      diffImage = 0;
    }
 

  }
}

// lets the difficuty change when you press the button
function diffButton() {
  if (diffImage === 0) {
    image(easyModeImage, windowWidth/2, windowHeight/1.59, windowWidth/6, windowHeight/7.7)
    difficulty =  30000;
  }
  if (diffImage === 1) {
    image(hardModeImage, windowWidth/2, windowHeight/1.59, windowWidth/6, windowHeight/7.7)
    difficulty = 20000;
  }
  if (diffImage === 2) {
    image(superHardModeImage, windowWidth/2, windowHeight/1.59, windowWidth/6, windowHeight/7.7)
    difficulty = 10000;
  }
}
 

// does the intro story when you press start
function introSequence() {
  if (introImage === 0 && millis() >= lastSwitch + waitTime) {
    introImage++;
    lastSwitch = millis();
  }
  if (introImage === 1 && millis() > lastSwitch + waitTime) {
    introImage++;
    lastSwitch = millis();
  }
  if (introImage === 2 && millis() > lastSwitch + waitTime) {
    introImage++;
    lastSwitch = millis();
  }
  if (introImage === 3 && millis() > lastSwitch + waitTime) {
    introImage++;
    lastSwitch = millis();
  }

  if (introImage === 4) {
    screen = "aisle1"; 
  }
  introScreen();
}

// goes along with introSequence to change the background
function introScreen() {
  if (introImage === 0) {
    image(intro1Image, 0, 0, windowWidth, windowHeight);
  }
  if (introImage === 1) {
    image(intro2Image, 0, 0, windowWidth, windowHeight);
  }
  if (introImage === 2) {
    image(intro3Image, 0, 0, windowWidth, windowHeight);
  }
  if (introImage === 3) {
    image(intro4Image, 0, 0, windowWidth, windowHeight);
    if (!gulpPlayed) {
      gulpNoise.play();
      gulpPlayed = true;
    }
  }
}

// sets background for when youre in aisle 1 and lets you go from aisle to aisle
function drawAisle1() {
  image(aisle1Image, 0, 0, windowWidth, windowHeight);
  if (character.characterX > windowWidth) {
    screen = "aisle2";
    character.characterX = 100;
  }
}

// sets background for when youre in aisle 2 and lets you go from aisle to aisle
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

//sets background for when youre in aisle 3 and lets you go from aisle to aisle
function drawAisle3() {
  image(aisle3Image, 0, 0, windowWidth, windowHeight);
  if (character.characterX < 0 - 100) {
    screen = "aisle2";
    character.characterX = windowWidth - 100;
  }
}


// draws the player and lets them move around
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