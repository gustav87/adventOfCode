// Requires Node v18 to use the fetch API

import fs from "fs";
import data from "./day2_fetch.js";

const choices = {
  X: 'X', // Lose
  Y: 'Y', // Draw
  Z: 'Z', // Win
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
  totalScore += getGameScore(choice);
  totalScore += getHandScore(choice, opponentChoices[index]);
})

console.log(totalScore);

function getGameScore(playerChoice) {
  if (playerChoice == choices.X) return 0;
  if (playerChoice == choices.Y) return 3;
  if (playerChoice == choices.Z) return 6;
}

function getHandScore(playerChoice, opponentChoice) {
  if (playerChoice == choices.X && opponentChoice == choices.A) return 3;
  if (playerChoice == choices.X && opponentChoice == choices.B) return 1;
  if (playerChoice == choices.X && opponentChoice == choices.C) return 2;

  if (playerChoice == choices.Y && opponentChoice == choices.A) return 1;
  if (playerChoice == choices.Y && opponentChoice == choices.B) return 2;
  if (playerChoice == choices.Y && opponentChoice == choices.C) return 3;

  if (playerChoice == choices.Z && opponentChoice == choices.A) return 2;
  if (playerChoice == choices.Z && opponentChoice == choices.B) return 3;
  if (playerChoice == choices.Z && opponentChoice == choices.C) return 1;
}

function readFile() {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}

