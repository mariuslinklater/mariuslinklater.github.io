// grid based project - minesweeper
// Marius Linklater
// 3/26/2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 20;
const DEAD_CELL = 0;
const LIVE_CELL = 400;
const BOMB_CELL = 100;
const TOUCHING_ONE = 1; // sees how many bombs a cell is touching
const TOUCHING_TWO = 2;
const TOUCHING_THREE = 3;
const TOUCHING_FOUR = 4;
const TOUCHING_FIVE = 5;
const TOUCHING_SIX = 6;
const TOUCHING_SEVEN = 7;
const TOUCHING_EIGHT = 8;

let rows;
let cols;
let grid;

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
}

function draw() {
  background(220);
  displayGrid();
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x, y);
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(cols, rows);
  }
  else if (key === "e") {
    grid = generateEmptyGrid(cols, rows);
  }
  else if (key === " ") {
    grid = takeTurn();
  }
}


function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === DEAD_CELL) {
      grid[y][x] = LIVE_CELL;
    }
    else if (grid[y][x] === LIVE_CELL) {
      grid[y][x] = DEAD_CELL;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === DEAD_CELL) {
        fill("white");
      }
      else if (grid[y][x] === LIVE_CELL) {
        fill("black");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 10) {
        newGrid[y].push(LIVE_CELL);
      }
      else {
        newGrid[y].push(DEAD_CELL);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(DEAD_CELL);
    }
  }
  return newGrid;
}