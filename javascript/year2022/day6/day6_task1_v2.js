const fs = require("fs");
const filename = "day6_input.txt";

const data = readFile(filename)

fourChars = "";

for (letter of data) {
  if (fourChars.length == 4) fourChars = fourChars.substring(1);
  fourChars += letter;
  if (fourChars.length == 4 && !hasDuplicates(fourChars)) break;
}

console.log(data.indexOf(fourChars) + 4);

function hasDuplicates(str) {
  const charArr = str.split("");
  // .some() tests whether at least one element passes the test. It will pass the test if there is at least 1 duplicate, and return true.
  return charArr.some((element, index) => charArr.indexOf(element) !== index);
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
