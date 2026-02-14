const express = require('express');
const cors = require('cors');

const stockRoutes = require('./routes/stock.routes');

const app = express();

app.use(cors({
    origin: [
      "http://localhost:3000",
      "https://finance-portfolio-r24k.vercel.app"
    ],
  }));
  
app.use(express.json());

app.use('/api', stockRoutes);

module.exports = app;
