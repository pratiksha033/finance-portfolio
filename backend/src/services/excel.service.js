const XLSX = require('xlsx');
const path = require('path');

function readPortfolio() {
  const filePath = path.join(__dirname, '../../excel.xlsx');

  const workbook = XLSX.readFile(filePath);

  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  return XLSX.utils.sheet_to_json(sheet);
}

module.exports = readPortfolio;
