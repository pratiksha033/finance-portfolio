const yahooFinance = require('yahoo-finance2');

exports.getCMP = async (symbol) => {
  try {
    const quote = await yahooFinance.quote(symbol);


    return quote.regularMarketPrice;

  } catch (err) {
 
    console.log('Yahoo blocked → using mock price');

    return Number((Math.random() * 2000 + 100).toFixed(2));
  }
};
