const readPortfolio = require('../services/excel.service');
const { getCMP } = require('../services/yahoo.service');
const { getFundamentals } = require('../services/google.service');
const cache = require('../services/cache.service');

const portfolio = readPortfolio();

exports.getPortfolio = async (req, res) => {
  try {

  
    const totalInvestment = portfolio.reduce(
      (sum, s) => sum + (s.purchasePrice * s.qty),
      0
    );

    const result = await Promise.all(
      portfolio.map(async (stock) => {

        const cached = cache.get(stock.symbol);
        if (cached) return cached;

       
        const cmp = await getCMP(stock.symbol);
        const fundamentals = await getFundamentals(stock.symbol);

       
        const investment = stock.purchasePrice * stock.qty;
        const presentValue = cmp * stock.qty;
        const gainLoss = presentValue - investment;
        const portfolioPercent = (investment / totalInvestment) * 100;

     
        const finalData = {
          ...stock,
          cmp,
          pe: fundamentals.pe,
          earnings: fundamentals.earnings,
          investment,
          presentValue,
          gainLoss,
          portfolioPercent
        };

        cache.set(stock.symbol, finalData);

        return finalData;
      })
    );

    res.json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
