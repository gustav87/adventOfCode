const fs = require("fs");
const filename = "day4_input.txt";

const data = readFile(filename);

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
