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

// Not used.
function isFourDifferentChars(str) {
  const charArr = str.split("");
  // Filter out duplicates. When it finds a duplicate, the index of that duplicate will not equal the index of the first occurrence found by .indexOf().
  result = charArr.filter((item, index) => charArr.indexOf(item) !== index);
  return result.length == 0;
}

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
