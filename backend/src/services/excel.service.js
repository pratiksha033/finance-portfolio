const XLSX = require('xlsx');
const path = require('path');

function readPortfolio() {
  const filePath = path.join(__dirname, '../../excel.xlsx');

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    raw: true
  });

  let currentSector = 'General';
  const portfolio = [];

  for (let i = 3; i < rows.length; i++) {
    const row = rows[i];

    const particulars = row[1];
    const purchasePrice = row[2];
    const qty = row[3];
    const symbol = row[6];

    if (!particulars) continue;

   
    if (!symbol) {
      currentSector = particulars;
      continue;
    }

   
    if (!isNaN(symbol)) continue;

    portfolio.push({
      name: particulars.trim(),
      symbol: symbol.trim() + '.NS',  
      purchasePrice: Number(purchasePrice),
      qty: Number(qty),
      sector: currentSector.trim()
    });
  }

  return portfolio;
}

module.exports = readPortfolio;
