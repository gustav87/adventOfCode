const fs = require("fs");
const filename = "day11_input.txt";

const data = readFile(filename);

const rounds = 10000;

const lines = data.split("\n")

const startMonkeys = [[], [], [], [], [], [], [], []];

let index = 0;
lines.forEach(line => {
  if (isNextMonkey(line)) index++;
  if (!isMonkey(line)) startMonkeys[index].push(line);
})

const monkeys = startMonkeys
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

const combinedModulo = monkeys.map(monkey => monkey.test).reduce((a, b) => a*b);

for (i = 0; i < rounds; i++) {
  monkeys.forEach(monkey => {
    const operator = monkey.operation.operator;
    const operand = monkey.operation.operand;
    const test = monkey.test;
    const trueCase = monkey.trueCase;
    const falseCase = monkey.falseCase;
  
    monkey.items.forEach(item => {
      monkey.inspections++;

      const worryLevel = isMultiply(operator) ? multiplyWorryLevel(item, operand) : addWorryLevel(item, operand);
      const reducedWorryLevel = reduceWorryLevel(worryLevel, combinedModulo);
      testWorryLevel(reducedWorryLevel, test) ? throwItem(monkeys[trueCase], reducedWorryLevel) : throwItem(monkeys[falseCase], reducedWorryLevel);
    })
    monkey.items = [];
  })
}

console.log(monkeys);

const inspections = monkeys.map(monkey => monkey.inspections)

console.log(getMaxInspections(inspections));

function getMaxInspections(inspections) {
  const sorted = inspections.sort((a,b) => b - a);
  return sorted[0] * sorted[1];
}

function throwItem(monkey, level) {
  monkey.items.push(level);
}

function testWorryLevel(level, test) {
  return level % test == 0;
}

function multiplyWorryLevel(level, operand) {
  return operand == "old" ? level * level : level * operand;
}

function addWorryLevel(level, operand) {
  return level + operand;
}

function reduceWorryLevel(level, divisor) {
  return level % divisor;
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
  return +(str.split(" ").at(-1));
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
