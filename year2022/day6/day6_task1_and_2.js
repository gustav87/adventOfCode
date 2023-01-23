const fs = require("fs");
const filename = "day6_input.txt";

const data = readFile(filename);
const strArr = data.split("");

// Part 1

const packetMarkerLength = 4;

const packetMarker = strArr
  .map((letter, index) => strArr.slice(index - packetMarkerLength, index)) 
  .filter(arr => arr.length != 0)
  .find(arr => !hasDuplicates(arr))
  .join("");

console.log(data.indexOf(packetMarker) + packetMarkerLength); // Answer to part 1

// Part 2

const messageMarkerLength = 14;

const messageMarker = strArr
  .map((letter, index) => strArr.slice(index - messageMarkerLength, index))
  .filter(arr => arr.length != 0)
  .find(arr => !hasDuplicates(arr))
  .join("");

console.log(data.indexOf(messageMarker) + messageMarkerLength); // Answer to part 2

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
