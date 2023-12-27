// Requires Node v18 to use the fetch API

import fs from "fs";
import data from "./day2_fetch.js";

const choices = {
  X: 'X', // Rock
  Y: 'Y', // Paper
  Z: 'Z', // Scissors
  A: 'A', // Rock
  B: 'B', // Paper
  C: 'C' // Scissors
}

// split string on both newline and space
const allChoices = data.split(/\n| /);
const playerChoices = allChoices.filter((elem, index) => index % 2);
const opponentChoices = allChoices.filter((elem, index) => !(index % 2));

let totalScore = 0;

playerChoices.forEach((choice, index) => {
  totalScore += getGameScore(choice, opponentChoices[index]);
  totalScore += getHandScore(choice);
})

console.log(totalScore);

function getGameScore(playerChoice, opponentChoice) {
  if (playerChoice == choices.X && opponentChoice == choices.A) return 3;
  if (playerChoice == choices.X && opponentChoice == choices.B) return 0;
  if (playerChoice == choices.X && opponentChoice == choices.C) return 6;
  if (playerChoice == choices.Y && opponentChoice == choices.A) return 6;
  if (playerChoice == choices.Y && opponentChoice == choices.B) return 3;
  if (playerChoice == choices.Y && opponentChoice == choices.C) return 0;
  if (playerChoice == choices.Z && opponentChoice == choices.A) return 0;
  if (playerChoice == choices.Z && opponentChoice == choices.B) return 6;
  if (playerChoice == choices.Z && opponentChoice == choices.C) return 3;
}

function getHandScore(playerChoice) {
  if (playerChoice == choices.X) return 1;
  if (playerChoice == choices.Y) return 2;
  if (playerChoice == choices.Z) return 3;
}

function readFile() {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}

