const axios = require('axios');
const cheerio = require('cheerio');

async function getFundamentals(symbol) {
  try {
    const { data } = await axios.get(
      `https://www.google.com/finance/quote/${symbol}`
    );

    const $ = cheerio.load(data);

    const pe = $('div:contains("P/E ratio")').next().text() || '-';
    const earnings =
      $('div:contains("Earnings per share")').next().text() || '-';

    return { pe, earnings };
  } catch {
    return { pe: '-', earnings: '-' };
  }
}

module.exports = { getFundamentals };
