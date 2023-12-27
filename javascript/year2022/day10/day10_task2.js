const fs = require("fs");
const filename = "day10_input.txt";

const data = readFile(filename);

// This approach of creating a 2D array produced some strange results. When modifying one element in one row, all the same elements in all rows updated, too.
//const crt = new Array(6).fill(new Array(40).fill("."))

// This is my preferred way of creating 2D arrays. It's simple enough. Got it from here:
// https://stackoverflow.com/questions/18163234/declare-an-empty-two-dimensional-array-in-javascript
const crt = [];
for (i = 0; i < 6; i++) {
  const row = [];
  for (j = 0; j < 40; j++) row.push('.');
  crt.push(row);
}

let X = 1;
let cycle = 0;
const numberOfColumns = 40;

data
  .split("\n")
  .forEach(line => {
    const row = getRow(cycle);
    let col = getColumn(cycle);
    if (isInsideRegisterRange(X, col)) crt[row][col] = '#';
    cycle++;
    if (isInstruction(line)) {
      col = getColumn(cycle);
      if (isInsideRegisterRange(X, col)) crt[row][col] = '#';
      const num = line.split(" ")[1];
      X += modifyRegister(num);
      cycle++;
    }
  })

let result = '';
crt.forEach(row => row.forEach((position, index) => {
  result += index % 40 == 0 ? "\n" + position : position;
}))

console.log(result);

function getColumn(cycle) {
  return cycle % numberOfColumns;
}

function getRow(cycle) {
  return Math.floor(cycle / numberOfColumns);
}
function isInsideRegisterRange(X, cycle) {
  return Math.abs(X - cycle) <= 1;
}

function isInstruction(str) {
  return str !== "noop";
}

function modifyRegister(i) {
  return +i;
}

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
