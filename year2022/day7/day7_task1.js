const fs = require("fs");
const filename = "day7_input.txt";

const data = readFile(filename);
const lines = data.split("\n");
let tree = {};

const oneLine = ["$ cd /", "$ ls", "dir gqcclj"];

oneLine.forEach(line => {
  processLine(tree, line);
})

console.log("hello");
// tree = createDir(tree, '/');


function removeDollarPrefix(str) {
  return str.slice(2);
}

function createDir(subTree, dir) {
  subTree[dir] = {
    dir: true,
    contents: {}
  }
}

function createFile(subTree, file_size, file_name) {
  subTree[file_name] = {
    dir: false,
    size: file_size
  }
}

function processLine(subtree, str) {
  const arr = str.split(" ");
  if (isCommand(arr[0])) {
    if (arr[1] == "ls") return;
    else if (arr[1] == "cd") {
      if (!(arr[2] in subtree)) {
        createDir(subtree, arr[2]);
      }
      // return subtree[arr[2]];
    };
  } else {
    if (arr[0] == "dir") createDir(subtree, arr[1]);
    else createFile(subtree, arr[0], arr[1]);
  }
}

function isCommand(str) {
  return str.indexOf('$') == 0;
}

function getCommand(command) {

}

const tree_mock = {
  "/": {
    "gqcclj": {
      dir: true,
      contents: {
        "dqp.gjm": {
          dir: false,
          size: 62425
        },
        "hrtw.qsd": {
          dir: false,
          size: 174181
        }
      }
    },
    "lmtpm": {
      dir: true,
      contents: {
        "clffsvcw": {
          dir: true,
          contents: {}
        },
        "cvcl.jqh": {
          dir: false,
          size: 163587
        }
      }
    },
    "nhqwt": {},
    "qcq": {},
    "vwqwlqrt": {}
  }
};

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
