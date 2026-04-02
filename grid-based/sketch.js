// grid based project - wordle
// Marius Linklater
// 3/26/2026
//
// Extra for Experts:
// - getting the lines from the .txt file along with split(), includes()

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
let guess = [];
let guessCount = 0;

function preload() {
  allWords = loadStrings('5-letter-words.txt'); // loads list of 5 letter words from outside text file
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = 6;
  cols = 5;
  grid = generateEmptyGrid(cols, rows);
  letterGrid = generateEmptyGrid(cols, rows);
  goalWord = random(allWords);
  wordLetters = goalWord.split('');   // splits word into array of letters, we didnt learn this in class
  
}

function draw() {
  translate((width-cols*CELL_SIZE)/2,(height-rows*CELL_SIZE)/3);
  background(255);
  displayGrid();
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
  drawLetters();
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
  if (guess.length <= 5) {
    letter = key;
    guess.push(letter);
    letterGrid[guessCount].push(letter);
  }
  if (keyCode === BACKSPACE ) {
    guess.splice(guess.length-2,2);
    grid[guessCount][guess.length - 1] = WHITE_CELL;
  }
  if (keyCode === ENTER) {
    guess.pop();
    displayGuess();
    guessCount++;
    
    if (guess === goalWord) {
      youWin();
    }
    guess = [];
  }
}

function displayGuess() {
  for(let i = 0; i < guess.length; i++ ) {
    if (guess[i] === goalWord[i]) {
      grid[guessCount][i] = GREEN_CELL;
    }
    else if (goalWord.includes(guess[i]) && grid[guessCount][i] !== GREEN_CELL) {
      grid[guessCount][i] = YELLOW_CELL;
    }
    else {
      grid[guessCount][i] = GREY_CELL;
    }
  }
}

function drawLetters() {
  let letterGrid = [];
  for (let y = 0; y < rows; y++) {
    letterGrid.push([]);
    for (let x = 0; x < cols; x++) {
      letterGrid[y].push('');
      text(guess[x], letterGrid[x], letterGrid[y]);
    }
  }
  
}
