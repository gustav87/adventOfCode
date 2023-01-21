const fs = require("fs");
const filename = "day3_input.txt";

const data = readFile(filename);
const prios = createPrios("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

const rucksacks = data.split("\n");
rucksacks.pop(); // Remove last element in array since it is just an empty string. This creates an array with length 300 as expected.

const groupsOfThree = createGroups(rucksacks);

const badges = getBadges(groupsOfThree);

const sum = getSum(badges, prios);
console.log(sum);

function getBadges(groups) {
  const badges = [];
  groupsOfThree.forEach(group => {
    let backpack1 = group[0];
    let backpack2 = group[1];
    let backpack3 = group[2];
    for (let item of backpack1) {
      if (backpack2.includes(item) && backpack3.includes(item)) {
        badges.push(item);
        break;
      }
    }
  })
  return badges;
}

function createGroups(rucksacks) {
  let groupsOfThree = [];
  while (rucksacks.length) {
    groupsOfThree.push(rucksacks.splice(0, 3));
  }
  return groupsOfThree;
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
