import readFile from "../readFile.mts";
const filePath = "day1/day1_input.txt";

const contents = readFile(filePath);

const col1: number[] = [];
const col2: number[] = [];

const re = /\d+/g;

for (const line of contents.split("\n")) {
  const match = line.match(re);
  if (Array.isArray(match) && match.length > 0) {
    col1.push(+match[0]);
    col2.push(+match[1]);
  }
}

col1.sort();
col2.sort();

const diffArr: number[] = [];

for (const elem of col1) {
  const diff = Math.abs(elem - col2[0]);
  col2.shift();
  diffArr.push(diff);
}

const diffTotal = diffArr.reduce((acc, curr) => acc + curr, 0);

console.log(diffTotal);
