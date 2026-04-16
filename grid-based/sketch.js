// grid based project - wordle
// Marius Linklater
// 4/15/2026
//
// Extra for Experts:
// - getting the lines from the .txt file along with things like split(), includes(), .join(), .toLowerCase() and key.match() with the crazy code

const CELL_SIZE = 80;
const GREEN_CELL = 3;
const YELLOW_CELL = 2;
const GREY_CELL = 1;
const WHITE_CELL = 0;
let rows;
let cols;
let grid;
let word;
let allWords;
let goalWord;
let wordLetters;
let letterGrid = [];
let guessCount = 0;
let guess = [];



let keyboard = [
  ["q","w","e","r","t","y","u","i","o","p"],
  ["a","s","d","f","g","h","j","k","l"],
  ["z","x","c","v","b","n","m"]
];

let keyStates = {}; // stores color state of each letter



function preload() {
  allWords = loadStrings('5-letter-words.txt'); // loads list of 5 letter words from outside text file
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = 6;
  cols = 5;
  grid = generateEmptyGrid(cols, rows);
  goalWord = random(allWords);
  wordLetters = goalWord.split('');   // splits word into array of letters, we didnt learn this in class
  
}

function draw() {
  translate((width-cols*CELL_SIZE)/2,(height-rows*CELL_SIZE)/3);
  background(255);
  displayGrid();
  displayLetters();
  displayKeyboard();
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === WHITE_CELL) {
        fill("white");
      }
      else if (grid[y][x] === YELLOW_CELL) {
        fill(200,182,83);
      }
      else if (grid[y][x] === GREEN_CELL) {
        fill(108,169,101);
      }
      else if (grid[y][x] === GREY_CELL) {
        fill(120,124,127);
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE * 0.9);
    }
  }
  
}


function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(WHITE_CELL);
    }
  }
  return newGrid;
}

function keyPressed() {
  if (keyCode === BACKSPACE ) {
    if(guess.length > 0) {
      guess.pop();  
    }
  }
  
  if (keyCode === ENTER && guess.length === 5) {
    letterGrid.push(structuredClone(guess));
    displayGuess();
    guessCount++;

    if (guess.join('') === goalWord) {
      youWin();
    }
    guess = [];
  }
  if (guess.length < 5 && key.match(/^[a-zA-Z]$/)) {  //makes sure you can only input letters and not things like shift and caps and whatever, not covered in class
    guess.push(key.toLowerCase());                    //makes all characters lowercase so it looks cleaner, not covered in class
  }  
}

//changes the grid colors to show what letters are in the goal word or not
function displayGuess() {
  for(let i = 0; i < guess.length; i++ ) {
    let letter = guess[i];

    if (letter === goalWord[i]) {
      grid[guessCount][i] = GREEN_CELL;
      keyStates[letter] = GREEN_CELL;
    }
    else if (goalWord.includes(letter)) {
      grid[guessCount][i] = YELLOW_CELL;

      if (keyStates[letter] !== GREEN_CELL) {
        keyStates[letter] = YELLOW_CELL;
      }
    }
    else {
      grid[guessCount][i] = GREY_CELL;

      if (!keyStates[letter]) {
        keyStates[letter] = GREY_CELL;
      }
    }
  }
}



function displayLetters(x, y) {
  textSize(60);
  textAlign(CENTER, CENTER);

  // draws submitted guesses
  for (let y = 0; y < letterGrid.length; y++) {
    for (let x = 0; x < letterGrid[y].length; x++) {
      
      if (grid[y][x] === WHITE_CELL) {
        fill('black');
      } else {
        fill('white');
      }

      text(letterGrid[y][x], x * CELL_SIZE + CELL_SIZE * 0.45, y * CELL_SIZE + CELL_SIZE * 0.45);
    }
  }

   // Draw live guess
  for (let x = 0; x < guess.length; x++) {
    fill('black');
    text(guess[x], x * CELL_SIZE + CELL_SIZE * 0.45, guessCount * CELL_SIZE + CELL_SIZE * 0.45);
  }
}


// draws another grid, this time a keyboard which keeps track of the letters you have used by changing color
function displayKeyboard() {
  let keySize = 50;

  let startY = rows * CELL_SIZE + 20;

  textSize(20);
  textAlign(CENTER, CENTER);

  for (let y = 0; y < keyboard.length; y++) {
    for (let x = 0; x < keyboard[y].length; x++) {

      let letter = keyboard[y][x];

      let posX = x * keySize;
      let posY = startY + y * keySize;
      
      let color = keyStates[letter];

      if (color === undefined) {
        color = WHITE_CELL;
      }
      if (color === GREEN_CELL) {
        fill(108,169,101);
      }
      else if (color === YELLOW_CELL) {
        fill(200,182,83);
      }
      else if (color === GREY_CELL) {
        fill(120,124,127);
      }
      else {
        fill(255);
      } 

      square(posX, posY, 0.9 * keySize);
      
      if (color === WHITE_CELL) {
        fill('black');
      }
      else {
        fill('white');
      }
      text(letter, posX + keySize/2, posY + keySize/2);
    }
  }
}