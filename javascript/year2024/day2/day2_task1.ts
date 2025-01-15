import readFile from "../readFile.mts";
const filePath = "day2/day2_input.txt";

const contents = readFile(filePath);

// An array of arrays, where each inner array is a report, consisting of levels.
const reports: number[][] = [];
const safeReports: number[][] = [];

const re = /\d+/g;

for (const line of contents.split("\n")) {
  const report = line.match(re);
  if (Array.isArray(report) && report.length > 0) {
    reports.push(report.map((level) => +level));
  }
}

const MAXDIFF = 3;
const MINDIFF = 1;

const isReportWithinBounds = (report: number[]): boolean => {
  let i = 0;
  for (const currLevel of report) {
    if (i === 0) {
      i++;
      continue;
    }
    const prevLevel = report[i - 1];
    const distance = Math.abs(currLevel - prevLevel);
    if (distance > MAXDIFF || distance < MINDIFF) {
      return false;
    };
    i++;
  }
  return true;
}

const isReportAsc = (arr: number[]): boolean => arr.every((curr, i, origArr) => i === 0 || curr > origArr[i - 1]);
const isReportDesc = (arr: number[]): boolean => arr.every((curr, i, origArr) => i === 0 || curr < origArr[i - 1]);

for (const report of reports) {
  if (!isReportAsc(report) && !isReportDesc(report)) continue;
  if (!isReportWithinBounds(report)) continue;
  safeReports.push(report);
}

console.log(safeReports.length);
