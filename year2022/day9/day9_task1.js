const fs = require("fs");
const filename = "day9_input.txt";

const dim = 1000;
const startPos = dim/2;
let board = createBoard(dim);

let positionsVisited = 0;

let head = {row: startPos, col: startPos};
let tail = {row: startPos, col: startPos};

visitPosition(startPos, startPos);

const data = readFile(filename);
const moves = data
  .split("\n")
  .map(line => line.split(" "))
  .map(line => line.map(elem => +elem ? +elem : elem)) // Parse to number if parseable, otherwise leave untouched
  .map(line => {
    move(line);
  })

console.log(positionsVisited);

function move(line) {
  const direction = line[0];
  const amount = line[1];

  for (i = 0; i < amount; i++) {
    moveHead(direction);
    moveTail();
  }
}

function moveHead(direction) {
  switch(direction) {
    case 'R':
      head.row++;
      break;
    case 'L':
      head.row--;
      break;
    case 'U':
      head.col--;
      break;
    case 'D':
      head.col++;
      break;
  }
}

function moveTail() {
  if (headIsNear()) return;
  if (head.col - tail.col > 0) tail.col++; // Head is to the right of tail. Move right.
  if (head.col - tail.col < 0) tail.col--; // Head is to the left of tail. Move left.
  if (head.row - tail.row < 0) tail.row--; // Head is below tail. Move down.
  if (head.row - tail.row > 0) tail.row++; // Head is above tail. Move up.

  if (board[tail.row][tail.col] == 'U') {
    visitPosition(tail.row, tail.col);
  } 
}

function headIsNear() {
  const colDiff = Math.abs(head.col - tail.col);
  const rowDiff = Math.abs(head.row - tail.row);
  return colDiff <= 1 && rowDiff <= 1;
}

function createBoard(dim) {
  return [...Array(dim)].map(_=>Array(dim).fill('U'));
}

function visitPosition(row, col) {
  board[row][col] = 'X';
  positionsVisited++;
}
function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
