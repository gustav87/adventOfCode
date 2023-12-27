const fs = require("fs");
const filename = "day8_input.txt";

const data = readFile(filename);
const forest = data
  .split("\n")
  .map(line => line.split(""))
  .map(line => line.map(tree => +tree))

const scenicScores = forest
  .map((row, rowIndex) => row.map((tree, columnIndex) => scenicTotalScore(tree, {row: rowIndex, column: columnIndex}, forest)))
  .flat();

const max = Math.max(...scenicScores)
console.log(max);

function scenicTotalScore(tree, position, forest) {
  return scenicScoreUp(tree, position, forest) *
         scenicScoreLeft(tree, position, forest) *
         scenicScoreRight(tree, position, forest) *
         scenicScoreDown(tree, position, forest);
}

function scenicScoreUp(tree, position, forest) {
  if (position.row == 0) return 0;

  const treesAbove = forest
    .map(row => row.filter((tree, columnIndex) => columnIndex == position.column))
    .flat()
    .filter((tree, rowIndex) => rowIndex < position.row)
    .reverse();

  let score = 0;
  for (const comparison of treesAbove) {
    score += 1;
    if (comparison >= tree) break;
  }
  return score;
}

function scenicScoreLeft(tree, position, forest) {
  if (position.column == 0) return 0;

  const treesLeft = forest
    .filter((row, rowIndex) => rowIndex == position.row)
    .flat()
    .filter((tree, columnIndex) => columnIndex < position.column)
    .reverse();

  let score = 0;
  for (const comparison of treesLeft) {
    score += 1;
    if (comparison >= tree) break;
  }
  return score;
}

function scenicScoreRight(tree, position, forest) {
  const lastColumn = 98;
  if (position.column == lastColumn) return 0;

  const treesRight = forest
    .filter((row, rowIndex) => rowIndex == position.row)
    .flat()
    .filter((tree, columnIndex) => columnIndex > position.column);

  let score = 0;
  for (const comparison of treesRight) {
    score += 1;
    if (comparison >= tree) break;
  }
  return score;
}

function scenicScoreDown(tree, position, forest) {
  const lastRow = 98;
  if (position.row == lastRow) return 0;

  const treesBelow = forest
    .map(row => row.filter((tree, columnIndex) => columnIndex == position.column))
    .flat()
    .filter((tree, rowIndex) => rowIndex > position.row);

  let score = 0;
  for (const comparison of treesBelow) {
    score += 1;
    if (comparison >= tree) break;
  }
  return score;
}

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
