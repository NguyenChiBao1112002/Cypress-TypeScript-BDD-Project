const fs = require("fs");
const path = require("path");

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

const featureFiles = getAllFeatureFiles("cypress/e2e");
fs.writeFileSync("matrix.json", JSON.stringify({ spec_file: featureFiles }, null, 2));
