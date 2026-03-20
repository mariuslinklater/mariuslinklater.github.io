// 2d rectangular grid demo

const CELL_SIZE = 80;
let rows;
let cols;
let grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateRandomGrid(cols, rows);
}

function draw() {
  background(220);
  displayGrid();
  toggleCell();
}

function generateRandomGrid(cols,rows) {
  newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50){
        newGrid[y].push(1);
      }
      else {
        newGrid[y].push(0);   
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols,rows) {
  newGrid = [];
  for (let y = 0; y < rows; y++){
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 1) {
        fill('white');
      }
      else {
        fill('black');
      }
      square( x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function mousePressed() {
  x = Math.floor(mouseX * CELL_SIZE);
  y = Math.floor(mouseY * CELL_SIZE);
  toggleCell( x, y );
  toggleCell( x - 1, y );
  toggleCell( x + 1, y );
  toggleCell( x, y - 1 );
  toggleCell( x, y + 1 );
}

function keyPressed() {
  if (key === 'r') {
    grid = generateRandomGrid(cols, rows);
  }
  else if ( key === 'e') {
    grid = generateEmptyGrid(cols, rows);
  }
}

function toggleCell(x, y) {
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 1) {
      grid[y][x] === 0;
    }
    else {
      grid[y][x] === 1;
    }
    square( x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE); 
  }
}

