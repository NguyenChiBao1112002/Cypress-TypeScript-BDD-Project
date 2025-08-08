const fs = require("fs");
const path = require("path");

const INPUT_TAG = process.env.INPUT_TAG; // từ GitHub Actions truyền vào

function getAllFeatureFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getAllFeatureFiles(filePath, fileList);
    } else if (file.endsWith(".feature")) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function fileContainsTag(filePath, tag) {
  const content = fs.readFileSync(filePath, "utf-8");
  return content.includes(tag);
}

const allFeatureFiles = getAllFeatureFiles("cypress/e2e");

const filteredFiles = INPUT_TAG
  ? allFeatureFiles.filter((file) => fileContainsTag(file, INPUT_TAG))
  : allFeatureFiles;

const matrix = filteredFiles.map((file) => ({ spec_file: file }));

fs.writeFileSync("matrix.json", JSON.stringify({ include: matrix }, null, 2));
