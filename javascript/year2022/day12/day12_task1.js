/*
We will use djistra's algorithm.
*/

const { log } = require("console");
const fs = require("fs");
const filename = "day12_input.txt";

const data = readFile(filename);

const lines = data.split("\n")

elevationMap = lines.map(line => line.split(""));

//console.log(elevationMap);

const queue = [];

/*
An element in the nodeMap has the following value: {
  row: number = 1, // This indicates that the node exists in the second row of the elevationMap
  col: number = 3, // This indicates that the node exists in the fourth column of the elevationMap
  cost: number = 5, // The cost is 5 to get from S to this node
  visited: boolean = true, // This node has been visited, and the shortest path from S to it has been calculated
}

And the key is "1,3".
*/
const nodeMap = new Map();

const resultArray = elevationMap
  .map((row, rowIndex) => {
    return row.map((node, columnIndex) => {
      return {
        id: getNodeId(rowIndex, columnIndex),
        row: rowIndex,
        col: columnIndex,
        value: node,
        cost: Infinity,
        visited: false,
        path: [],
        origin: undefined,
      }
    })
  })

//console.log(resultArray);
//console.log(resultArray.find((x) => x.value === "S"));

function upsertNodeInNodeMap(row, col, cost, visited) {
  const nodeId = getNodeId(row, col);
  const nodeData = {
    row,
    col,
    cost,
    visited,
  }
  const existingData = nodeMap.get(nodeId);
  if (!existingData) {
    nodeMap.set(nodeId, nodeData);
    return;
  }
  if (existingData.cost > nodeData.cost) {
    nodeMap.set(nodeId, nodeData);
  }
}

function getNodeId(rowIndex, columnIndex) {
  return `${rowIndex},${columnIndex}`;
}

function hasEdge(node1, node2) {
  return node1.value >= node2.value;
}

function getNeighbours(node) {
  //console.log(node);
  const row = node.row;
  const col = node.col;
  let left = col === 0 ? undefined : resultArray[row][col - 1];
  let right = col === 137 ? undefined : resultArray[row][col + 1];
  let up = row === 0 ? undefined : resultArray[row - 1][col];
  let down = row === 40 ? undefined : resultArray[row + 1][col];

  left = left && left.visited ? undefined : left;
  right = right && right.visited ? undefined : right;
  up = up && up.visited ? undefined : up;
  down = down && down.visited ? undefined : down;

  left = left && hasEdge(node.value, left) ? undefined : left;
  right = right && hasEdge(node.value, right) ? undefined : right;
  up = up && hasEdge(node.value, up) ? undefined : up;
  down = down && hasEdge(node.value, down) ? undefined : down;

  return [left, right, up, down].filter((x) => x);
//  return {
//    left: left && left.visited ? undefined : left,
//    right: right && right.visited ? undefined : right,
//    up: up && up.visited ? undefined : up,
//    down: down && down.visited ? undefined : down,
//  };
};

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
};

function findInResult(row, col, value) {
  if (row !== undefined && col !== undefined) {
    return resultArray[row][col];
  }
  return resultArray
    .find((row) => row.find((row) => row.value === value))
    .find((row) => row.value === value);
};

function addNodesToQueue(nodes) {
  nodes.forEach((node) => queue.push(node));
};

function processNode(node, origin) {
  let neighbours = getNeighbours(node);
  console.log(neighbours);
  neighbours.forEach((x) => {
    x.cost = x.origin.cost + 1;
    x.path = [...x.origin.path, x.value];
  });
  addNodesToQueue(neighbours);
}

function addOrigin(node, origin) {
  node.origin = origin;
  return node;
};

//const s = findInResult(20, 0, undefined);
let origin = findInResult(undefined, undefined, "S");
origin.cost = 0;
origin.visited = true;
let neighbours = getNeighbours(origin).map((n) => addOrigin(n, origin));
addNodesToQueue(neighbours);

while (queue.length > 0) {
  const node = queue.shift();
  processNode(node);
}

