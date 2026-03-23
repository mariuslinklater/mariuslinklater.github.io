// Arrays and Object Notation
// Marius Linklater
// March 5 2026
// most of this stuff is from the interactive scene, but I will show where I put new things of changed old stuff
// Extra for Experts:
// loading fonts for the menu, the assets folder which would be like paths, 

let screen;
let difficulty = 1;
let diffImage = 0;
let waitTime = 5000;
let introImage = 0;
let lastSwitch;
let gulpPlayed = false;
let showInventory = false;
let itemSelected = 0;
let itemsPossible = [];
let inventory = [];


// loads images and sounds
function preload(){
  characterImage = loadImage('assets/character.png');
  aisle1Image = loadImage('assets/storeAisle1.jpg');
  aisle2Image = loadImage('assets/storeAisle2.jpg');
  aisle3Image = loadImage('assets/storeAisle3.jpg');
  menuImage = loadImage('assets/menu.jpg');
  easyModeImage = loadImage('assets/menuEasyMode.png');
  hardModeImage = loadImage('assets/hardMenu.jpg');
  superHardModeImage = loadImage('assets/superHardMenu.jpg');
  intro1Image = loadImage('assets/intro1.jpg');
  intro2Image = loadImage('assets/intro2.jpg');
  intro3Image = loadImage('assets/intro3.jpg');
  intro4Image = loadImage('assets/intro4.jpg');
  gulpNoise = loadSound('assets/gulp.mp3');
  mapIconImage = loadImage('assets/mapIcon.png');
  eggsImage = loadImage('assets/rggs.jpg');
  milkImage = loadImage('assets/milk.jpg');
  breadImage = loadImage('assets/bread.jpg');
  font = loadFont('SHPinscher-Regular.otf');
  winImage = loadImage('assets/winScreen.jpg')
  loseImage = loadImage('assets/loseScreen.jpg')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  screen = 'menu';
  lastSwitch = millis();
  

  // NEW 
  // object notation + array for the characters inventory, items have a name, a size, a weight, a cost, and an X, Y, W and H for collisons
  itemsPossible = [{name:'bread', size:'medium', weight:'170g', cost:'3.50$', X:random(100,windowWidth - breadImage.width/4), Y:random(windowHeight/2, windowHeight - breadImage.height/4), 
                    W:breadImage.width/4, H:breadImage.height/4, image:breadImage, found:false},   
                  {name:'milk', size:'large', weight:'4.5kg', cost:'4$', X:random(100,windowWidth - milkImage.width/5), Y:random(windowHeight/2, windowHeight - milkImage.height/5), 
                    W:milkImage.width/5, H:milkImage.height/5, image:milkImage, found:false},
                   {name:'eggs', size:'small', weight:'700g', cost:'3$', X:random(100,windowWidth - eggsImage.width), Y:random(windowHeight/2, windowHeight - eggsImage.height),
                    W:eggsImage.width, H:eggsImage.height, image:eggsImage, found:false} ];
}

let character = {
  X: 400,
  Y: 400,
  speed:12,
  W: 0,
  H: 0
};



function draw() {
  drawBackground();
  drawCharacter();
  drawGroceries();
  checkPickup();
  if(showInventory) {
    inventoryThing();
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
  if (screen === 'winScreen') {
    drawWinScreen();
  }
  if (screen === 'loseScreen') {
    drawLoseScreen();
  }
}

// changes background to menu and puts buttons
function drawMenu(){
  image(menuImage, 0, 0, windowWidth, windowHeight);
  diffButton();
}

// NEW-ISH changed the difficulty button thing to fix the fast changing
// lets the difficulty change when you press the button
// other buttons made aswell
function mousePressed() {
  if (mouseX > windowWidth/2 && mouseX < windowWidth/1.2 && mouseY > windowHeight/3 && mouseY < windowHeight/1.7) {
    diffImage ++;
    if (diffImage > 2){
      diffImage = 0;
    }
  }
  if (mouseX > windowWidth/7 && mouseX < windowWidth/2 && mouseY > windowHeight/3 && mouseY < windowHeight/1.7) {
    screen = 'intro';
  }
  if (mouseX > 0 && mouseX < 250 && mouseY > windowHeight - 250 && mouseY < windowHeight) {
    inventoryThing();
  }
}

function diffButton() {
  if (diffImage === 0) {
    image(easyModeImage, windowWidth/2, windowHeight/1.59, windowWidth/6, windowHeight/7.7);
    difficulty =  1;
  }
  if (diffImage === 1) {
    image(hardModeImage, windowWidth/2, windowHeight/1.59, windowWidth/6, windowHeight/7.7);
    difficulty = 2;
  }
  if (diffImage === 2) {
    image(superHardModeImage, windowWidth/2, windowHeight/1.59, windowWidth/6, windowHeight/7.7);
    difficulty = 3;
  }
}
 
// NEW-ISH chnged this into a while loop, takes way less code now
// does the intro story when you press start
function introSequence() {
  let introLoop = 0;
  while (introLoop < 5) {
    introScreen();
    if (millis() >= lastSwitch + waitTime) {
      introImage++;  
      lastSwitch = millis();
    }
    introLoop++;
  }
  
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
  if (introImage === 4) {
    screen = 'aisle1';
  }
}

// sets background for when youre in aisle 1 and lets you go from aisle to aisle
function drawAisle1() {
  image(aisle1Image, 0, 0, windowWidth, windowHeight);
  if (character.X > windowWidth) {
    if (difficulty === 1) {
      if (inventory.length === 3){
        screen = 'winScreen';
      }
      else {
        screen = 'loseScreen';
      }
    }
    else {
      screen = "aisle2";
      character.X = 100; 
    }
 
  }
}

// sets background for when youre in aisle 2 and lets you go from aisle to aisle
function drawAisle2() {
  image(aisle2Image, 0, 0, windowWidth, windowHeight);
  
  if (character.X > windowWidth) {
    if (difficulty === 2){
      if (inventory.length === 3){
        screen = 'winScreen';
      }
      else {
        screen = 'loseScreen';
      }
    }
    else {
      screen = "aisle3";
      character.X = 100;  
    }

  }

  if (character.X < 0) {
    screen = "aisle1";
    character.X = windowWidth - 100;
  }
}

//sets background for when youre in aisle 3 and lets you go from aisle to aisle
function drawAisle3() {
  image(aisle3Image, 0, 0, windowWidth, windowHeight);
  if (character.X < 0 - 100) {
    screen = "aisle2";
    character.X = windowWidth - 100; 
  }
  if (character.X > windowWidth) {
    if (difficulty === 3){
      if (inventory.length === 3){
        screen = 'winScreen';
      }
      else {
        screen = 'loseScreen';
      }
    }

  }
}

function drawWinScreen() {
  image(winImage, 0, 0, windowWidth, windowHeight);
}

function drawLoseScreen() {
  image(loseImage, 0, 0, windowWidth, windowHeight);
}

// draws the player and lets them move around
function drawCharacter() {
  if (screen !== 'menu' && screen !== 'intro' && screen !== 'winScreen') {
    image(characterImage, character.X, character.Y, 360* (character.Y/350),  540 * (character.Y/350) );
    character.W =  360* (character.Y/350);
    character.H =  540 * (character.Y/350);

    if(!showInventory) {
      if(keyIsDown(87) && character.Y > windowHeight/2 - 400 * (character.Y/350)) { //w
        character.Y -= character.speed/1.6;
      }
      if(keyIsDown(83)) { //s
        character.Y += character.speed/1.6;
      }  if(keyIsDown(68)) { //d
        character.X += character.speed;
      }  if(keyIsDown(65)) { //a
        character.X -= character.speed;
      }
    }
  } 
}

function keyPressed() {
  if (key === 'e' && screen !== 'menu' && screen !== 'intro' && screen !== 'winScreen') {
    showInventory = !showInventory;
  }
  if (showInventory && inventory.length > 0) {
    if (key === 'd') {
      itemSelected++;
      if (itemSelected >= inventory.length) {
        itemSelected = 0;
      }
    }
    if (key === 'a') {
      itemSelected--;
      if (itemSelected < 0) {
        itemSelected = inventory.length - 1;
      }
    }
  }
}

// NEW
//handles the inventory 
function inventoryThing() {
  fill(30);
  rect(0, 0, windowWidth/2, windowHeight);
  textFont(font);
  textSize(50);

  for(let i = 0; i < inventory.length; i++) {  //writes the names of what you have in your inventory, highlights which item you are currently on
    let textX = 100 + i * 200;
    if(i === itemSelected){
      fill('green');
    }
    else {
      fill('white');
    }
    text(inventory[i].name, textX, windowHeight/8);
  
  }
  if (inventory.length > 0) {                   //writes the stats of the item you have selected along with an image
    let item = inventory[itemSelected];

    fill(255);
    text("Size: " + item.size, 100, windowHeight/8 + 200);
    text("Weight: " + item.weight, 100, windowHeight/8 +400);
    text("Cost: " + item.cost, 100, windowHeight/8 + 600);
    image(item.image, 400,300, item.W, item.H);
  }
}

//NEW
// draws the items our character is looking for
function drawGroceries() {
  if (screen ==='aisle1') {
    for (let i = 0; i < itemsPossible.length; i++) {
      image(itemsPossible[i].image, itemsPossible[i].X, itemsPossible[i].Y, itemsPossible[i].W, itemsPossible[i].H);
    }
  }
}

 
//NEW
//checks if character and any items are touching, if they are it adds the item to inventory and takes it from itemsPossible
function checkPickup() { 
  for (let i = itemsPossible.length - 1; i >= 0; i--) {
    let item = itemsPossible[i];
    if (character.X - character.W/2 < item.X + item.W/2 && //check left boundary
      character.X + character.W/2 > item.X - item.W/2 && //check right boundary
      character.Y - character.H/2 < item.Y + item.H/2 && //check top boundary
      character.Y + character.H/2 > item.Y - item.H/2) { //check bottom boundary
      inventory.push(item);       
      itemsPossible.splice(i,1);
    }
  }
}