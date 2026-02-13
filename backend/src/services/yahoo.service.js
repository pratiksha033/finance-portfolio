const axios = require('axios');

async function getCMP(symbol) {
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`;

  const { data } = await axios.get(url);

  return data.quoteResponse.result[0]?.regularMarketPrice || 0;
}

module.exports = { getCMP };
