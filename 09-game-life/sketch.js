// 2d rectangular grid demo

const CELL_SIZE = 21;
let autoPlayIsOn = false;
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
  if (autoPlayIsOn && frameCount % 5 === 0) {
    grid = takeTurn();
  }
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
  else if (key === "a") {
    autoPlayIsOn = !autoPlayIsOn;
  }
}

function takeTurn() {
  let nextTurn = generateEmptyGrid(cols, rows);
  for(let x = 0; x < cols; x++) {
    for(let y = 0; y < rows; y++) {
      let neighbors= 0;
      for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
          if (x + i >= 0 && x + i < cols && y + j >= 0 && y + j < rows) {
            neighbors+= grid[y+j][x+i]; 
          }
        }
      }
      neighbors -= grid[y][x];

      // apply rules
      if (grid[y][x] === 1) {
        //currently alive
        if (neighbors === 2 || neighbors === 3 ){
          nextTurn[y][x] = 1;
        } 
        else {
          nextTurn[y][x] = 0;
        }
      }
      if (grid[y][x] === 0){
        //dead
        if (neighbors === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }
}


function toggleCell(x, y) {
  //make sure the cell you're toggling is in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
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
      if (random(100) < 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
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
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

