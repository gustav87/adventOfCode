const fs = require("fs");
const filename = "day3_input.txt";

const data = readFile(filename);
const prios = createPrios("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

const rucksacks = data.split("\n");

const dupes = getDupes(rucksacks);
const sum = getSum(dupes, prios);
console.log(sum);

function getDupes(rucksacks) {
  let duplicates = [];
  rucksacks.forEach(rucksack => {
    const len = rucksack.length;
    const compartment1 = rucksack.substr(0, len / 2);
    const compartment2 = rucksack.substr(len / 2, len);
    for (let item of compartment1) {
      if (compartment2.includes(item)) {
        duplicates.push(item);
        break;
      }
    }
  })
  return duplicates;
}

function createPrios(letters) {
  const letterList = letters.split('');
  let prios = {};
  letterList.forEach((letter, i) => {
    prios[letter] = i + 1;
  })
  return prios;
}

function getSum(dupes, prios) {
  let sum = 0;
  for (let dupe of dupes) {
    sum += prios[dupe];
  }
  return sum;
}

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
