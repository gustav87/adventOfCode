import fs from "fs";

const readFile = (path: string): string => fs.readFileSync(path, "utf8");

export default readFile;
