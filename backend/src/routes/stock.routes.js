const router = require('express').Router();
const { getPortfolio } = require('../controllers/stock.controller');

router.get('/portfolio', getPortfolio);

module.exports = router;
