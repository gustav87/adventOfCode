const fs = require("fs");
const filename = "day10_input.txt";

const data = readFile(filename);

const cycleStops = [20, 60, 100, 140, 180, 220];

// We should increment cycle BEFORE we process the operation, so that signal strength is calculated correctly,

let X = 1;
let cycle = 1;

const totalSignalStrength = data
  .split("\n")
  .map(line => {
    let signalStrength = 0;
    if (isCycleStop(cycle)) signalStrength = calculateSignalStrength(cycle, X);
    cycle++;

    if (isInstruction(line)) {
      if (isCycleStop(cycle)) signalStrength = calculateSignalStrength(cycle, X);
      cycle++;
      const num = line.split(" ")[1];
      X += modifyRegister(num);
    }

   return signalStrength;
  })
 .reduce((a, b) => a + b, 0);

console.log(totalSignalStrength);

function isCycleStop(cycle) {
  return cycleStops.includes(cycle);
}
function calculateSignalStrength(cycle, X) {
  return cycle * X;
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
