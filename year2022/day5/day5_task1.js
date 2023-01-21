const fs = require("fs");
const filename = "day5_input.txt";

const data = readFile(filename);

const state = [
  ['F', 'C', 'P', 'G', 'Q', 'R'], // Stack 1, R is on top
  ['W', 'T', 'C', 'P'], // Stack 2
  ['B', 'H', 'P', 'M', 'C'], // Stack 3
  ['L', 'T', 'Q', 'S', 'M', 'P', 'R'], // Stack 4
  ['P', 'H', 'J', 'Z', 'V', 'G', 'N'], // Stack 5
  ['D', 'P', 'J'], // Stack 6
  ['L', 'G', 'P', 'Z', 'F', 'J', 'T', 'R'], // Stack 7
  ['N', 'L', 'H', 'C', 'F', 'P', 'T', 'J'], // Stack 8
  ['G', 'V', 'Z', 'Q', 'H', 'T', 'C', 'W'], // Stack 9
]

const instructions = data.split("\n")
  .map(line => line.match(/\d+/g));

instructions.forEach(i => executeInstruction(i));

const topCrates = state
  .map(stack => stack.slice(-1)[0])
  .reduce((a, b) => a + b, "");

console.log(topCrates);

function executeInstruction(i) {
  const amount = i[0];
  const from = i[1] - 1;
  const to = i[2] - 1;
  for (i = 0; i < amount; i++) {
    const crate = state[from].pop();
    state[to].push(crate);
  }
}

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
