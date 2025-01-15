import readFile from "../readFile.mts";
const filePath = "day2/day2_input.txt";

const contents = readFile(filePath);

// An array of arrays, where each inner array is a report, consisting of levels.
const reports: number[][] = [];
const safeReports: number[][] = [];

type ReportWithinBoundsResult = {
  fail: boolean;
  problemIndex?: number;
}

type ReportOrder = "DESC" | "ASC" | undefined;

const re = /\d+/g;

for (const line of contents.split("\n")) {
  const report = line.match(re);
  if (Array.isArray(report) && report.length > 0) {
    reports.push(report.map((level) => +level));
  }
}

const MAXDIFF = 3;
const MINDIFF = 1;

const checkReport = (report: number[]): ReportWithinBoundsResult => {
  let i = 0;
  let reportOrder: ReportOrder = undefined;
  if (report.length === 0) return { fail: true };

  for (const currLevel of report) {
    if (i === 0) {
      i++;
      continue;
    }

    const prevLevel = report[i - 1];

    // Check ordering
    if (i === 1) {
      reportOrder = currLevel > prevLevel ? "ASC" : "DESC";
    }
    if (!reportOrder || (reportOrder === "ASC" && currLevel <= prevLevel) || (reportOrder === "DESC" && currLevel >= prevLevel)) {
      return {
        fail: true,
        problemIndex: i - 1,
      } satisfies ReportWithinBoundsResult;
    }

    // Check distance
    const distance = Math.abs(currLevel - prevLevel);
    if (distance > MAXDIFF || distance < MINDIFF) {
      return {
        fail: true,
        problemIndex: i,
      } satisfies ReportWithinBoundsResult;
    };

    i++;
  }
  return { fail: false } satisfies ReportWithinBoundsResult;
};

for (const report of reports) {
  const result = checkReport(report);
  if (result.fail) {
    for (const i of [result.problemIndex! - 1, result.problemIndex!, result.problemIndex! + 1]) {
      const copy = report.slice();
      copy.splice(i, 1);
      const dampenedResult = checkReport(copy);
      if (!dampenedResult.fail) {
        safeReports.push(report);
        break;
      }
    }
    continue;
  }
  safeReports.push(report);
}

console.log(safeReports.length);
