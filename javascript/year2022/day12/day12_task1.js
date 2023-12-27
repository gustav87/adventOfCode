const { log } = require("console");
const fs = require("fs");
const filename = "day12_input.txt";

const data = readFile(filename);

const lines = data.split("\n")

elevationMap = lines.map(line => line.split(""));

console.log(elevationMap);

/*
We want to recursively run through this. Like a tree structure. Get neighbors. Make it greedy I guess. anything else will run for too long I think.
So if you get neighbors and there is only one path that brings you higher, you take it.
If there are two or more equally good paths, we need to run down all of them.
Then, when all paths are completed, we count the steps taken for each of them.
*/

function getNeighbors(myPos, elevationMap) {
  const x = myPos.x;
  const y = myPos.y;
  return {
    left: elevationMap[x - 1][y],
    right: elevationMap[x + 1][y],
    up: elevationMap[x][y + 1],
    down: elevationMap[x][y - 1]
  };
};

// myPos = {x: index of row, y: index of column}
function setVisited(myPos, elevationMap) {
  elevationMap[myPos.x][myPos.y] = 'X';
};

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
};
