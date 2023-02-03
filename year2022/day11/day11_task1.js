const fs = require("fs");
const filename = "day11_input.txt";

const data = readFile(filename);

const rounds = 20;

const lines = data.split("\n")

const numberOfMonkeys = lines
  .filter(line => isMonkey(line))
  .map(monkey => 1)
  .reduce((a, b) => a + b, 0);

const monkeys = [[], [], [], [], [], [], [], []];

let index = 0;
lines.forEach(line => {
  if (isNextMonkey(line)) index++;
  if (!isMonkey(line)) monkeys[index].push(line);
})

const finishedMonkeys = monkeys
  .map((monkey, index) => {
    const monkeyObj = {
      id: index,
      items: [],
      operation: {},
      test: 0,
      trueCase: 0,
      falseCase: 0,
      inspections: 0
    };

    monkey
      .forEach(line => {
        if (isItems(line)) monkeyObj.items = getItems(line);
        if (isOperation(line)) monkeyObj.operation = getOperation(line);
        if (isTest(line)) monkeyObj.test = getTestOrCase(line);
        if (isTrueCase(line)) monkeyObj.trueCase = getTestOrCase(line);
        if (isFalseCase(line)) monkeyObj.falseCase = getTestOrCase(line);
      })

    return monkeyObj;
  })

for (i = 0; i < rounds; i++) {
  finishedMonkeys.forEach(monkey => {
    const operator = monkey.operation.operator;
    const operand = monkey.operation.operand;
    const test = monkey.test;
    const trueCase = monkey.trueCase;
    const falseCase = monkey.falseCase;
  
    monkey.items.forEach(item => {
      monkey.inspections++;
      let worryLevel = isMultiply(operator) ? multiplyWorryLevel(item, operand) : addWorryLevel(item, operand);
      worryLevel = Math.floor(worryLevel / 3);
      testWorryLevel(worryLevel, test) ? executeCase(worryLevel, finishedMonkeys[trueCase]) : executeCase(worryLevel, finishedMonkeys[falseCase]);
    })
    monkey.items = [];
  })
}

const inspections = finishedMonkeys
  .map(monkey => monkey.inspections)

const maxList = getMaxList(inspections);

console.log(maxList[0] * maxList[1]);

function getMaxList(inspections) {
  const max = Math.max(...inspections);
  const maxList = inspections.filter(i => i == max);

  if (maxList.length > 1) return [max, max];

  const secondMax = Math.max(...inspections.filter(i => i !== max))
  return [max, secondMax];
}
function executeCase(level, monkey) {
  monkey.items.push(level);
}

function testWorryLevel(level, test) {
  return level % test == 0;
}
function multiplyWorryLevel(level, operand) {
  return operand == "old" ? level * level : level * operand;
}

function addWorryLevel(level, operand) {
  return operand == "old" ? level + level : level + operand;
}

function isMultiply(operator) {
  return operator == '*';
}
// Returns an array of numbers
function getItems(str) {
  const regExp = /\d+/g;
  return str.match(regExp).map(item => +item);
}

function getOperation(str) {
  const parts = str.split(" ");
  const operand = isNaN(+parts.at(-1)) ? "old" : +parts.at(-1);
  const operator = parts[parts.length - 2];
  return { operator, operand }
}

function getTestOrCase(str) {
  return +str.split(" ").at(-1);
}

function isMonkey(str) {
  return str.includes("Monkey");
}

function isNextMonkey(str) {
  return str == "";
}

function isItems(str) {
  return str.includes("Starting items");
}

function isOperation(str) {
  return str.includes("Operation");
}

function isTest(str) {
  return str.includes("Test");
}

function isTrueCase(str) {
  return str.includes("If true");
}

function isFalseCase(str) {
  return str.includes("If false");
}

function readFile(filename) {
  try {
    const data = fs.readFileSync(filename, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
}
