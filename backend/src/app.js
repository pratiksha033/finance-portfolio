const express = require('express');
const cors = require('cors');

const stockRoutes = require('./routes/stock.routes');

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use('/api', stockRoutes);

module.exports = app;
