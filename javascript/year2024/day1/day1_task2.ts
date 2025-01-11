import readFile from "../readFile.mts";
const filePath = "day1/day1_input.txt";

const contents = readFile(filePath);

const sum = (arr: number[]) => arr.reduce((acc, curr) => acc + curr, 0);
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

const similarityScores: number[] = [];

for (const elem of col1) {
  const frequency = col2.filter((num) => num === elem).length;
  const similarityScore = elem * frequency;
  similarityScores.push(similarityScore);
}

const similarityScoreTotal = sum(similarityScores);

console.log(similarityScoreTotal);
