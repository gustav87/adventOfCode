const fs = require("fs");
const filename = "day6_input.txt";

const markerLength = 4;

const data = readFile(filename);
const strArr = data.split("");

const packetMarker = strArr
  .map((letter, index) => strArr.slice(index - markerLength, index))
  .filter(e => e.length != 0)
  .find(fourChars => !hasDuplicates(fourChars))
  .join("");

console.log(data.indexOf(packetMarker) + markerLength);

function hasDuplicates(arr) {
  // .some() tests whether at least one element passes the test. It will pass the test if there is at least 1 duplicate, and return true.
  return arr.some((element, index) => arr.indexOf(element) !== index);
}

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
