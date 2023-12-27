const fs = require('fs');
const filename = "day1_input.txt";

contents = readFile();
const elfStrings = contents.split("\n");

elfTotals = [0];
sum = 0;
j = 0;

elfStrings.forEach(item => {
  item = parseInt(item);

  // On linebreaks, item will be the empty string "", so parseInt(item) will be NaN, which is checked for in this conditional
  if (!item) {
    j++;
    elfTotals[j] = 0;
  } else {
    elfTotals[j] += item;
  }
})

console.log(Math.max(...elfTotals));

function readFile() {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
