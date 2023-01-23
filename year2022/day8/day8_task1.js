const fs = require("fs");
const filename = "day8_input.txt";

const data = readFile(filename);
const forest = data
  .split("\n")
  .map(line => line.split(""))
  .map(line => line.map(tree => +tree))

const numberOfVisibleTrees = forest
  .map((row, rowIndex) => row.map((tree, columnIndex) => isVisible(tree, {row: rowIndex, column: columnIndex}, forest)))
  .flat()
  .map(tree => tree ? 1 : 0)
  .reduce((a, b) => a + b, 0)

console.log(numberOfVisibleTrees);

function isVisible(tree, position, forest) {
  return isVisibleUp(tree, position, forest) ||
         isVisibleLeft(tree, position, forest) ||
         isVisibleRight(tree, position, forest) ||
         isVisibleDown(tree, position, forest);
}

function isVisibleUp(tree, position, forest) {
  if (position.row == 0) return true;

  const treesAbove = forest
    .map(row => row.filter((tree, columnIndex) => columnIndex == position.column))
    .flat()
    .filter((tree, rowIndex) => rowIndex < position.row)

  return !(treesAbove.some(comparison => comparison >= tree))
}

function isVisibleLeft(tree, position, forest) {
  if (position.column == 0) return true;

  const treesLeft = forest
    .filter((row, rowIndex) => rowIndex == position.row)
    .flat()
    .filter((tree, columnIndex) => columnIndex < position.column)

  return !(treesLeft.some(comparison => comparison >= tree))
}

function isVisibleRight(tree, position, forest) {
  const lastColumn = 98;
  if (position.column == lastColumn) return true;

  const treesRight = forest
    .filter((row, rowIndex) => rowIndex == position.row)
    .flat()
    .filter((tree, columnIndex) => columnIndex > position.column)

  return !(treesRight.some(comparison => comparison >= tree))
}

function isVisibleDown(tree, position, forest) {
  const lastRow = 98;
  if (position.column == lastRow) return true;

  const treesBelow = forest
    .map(row => row.filter((tree, columnIndex) => columnIndex == position.column))
    .flat()
    .filter((tree, rowIndex) => rowIndex > position.row)

  return !(treesBelow.some(comparison => comparison >= tree))
}

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
