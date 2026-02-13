const readPortfolio = require('../services/excel.service');
const { getCMP } = require('../services/yahoo.service');
const { getFundamentals } = require('../services/google.service');
const cache = require('../services/cache.service');

const portfolio = readPortfolio();

exports.getPortfolio = async (req, res) => {
  try {
    const result = await Promise.all(
      portfolio.map(async (stock) => {
        const cached = cache.get(stock.Symbol);

        if (cached) return { ...stock, ...cached };

        const cmp = await getCMP(stock.Symbol);
        const fundamentals = await getFundamentals(stock.Symbol);

        const data = { cmp, ...fundamentals };

        cache.set(stock.Symbol, data);

        return { ...stock, ...data };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching portfolio' });
  }
};
