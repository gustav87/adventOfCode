const fs = require("fs");
const filename = "day4_input.txt";

const data = readFile(filename);

const sum = data.split("\n")
  .map(pair => pair.split(","))
  .map(pair => findPartialOverlap(pair))
  .reduce((a, b) => a + b, 0)

console.log(sum);

function findPartialOverlap(pair) {
  // Mapping from num to +num is done to parse the string to a number. You could do num => parseInt(num), instead.
  const elf1 = pair[0].split("-").map(num => +num);
  const elf2 = pair[1].split("-").map(num => +num);
  if (elf1[0] >= elf2[0] && elf1[0] <= elf2[1]) return 1;
  if (elf1[1] <= elf2[1] && elf1[1] >= elf2[0]) return 1;
  if (elf2[0] >= elf1[0] && elf2[0] <= elf1[1]) return 1;
  if (elf2[1] <= elf1[1] && elf2[1] >= elf1[0]) return 1;
  return 0;
}

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
