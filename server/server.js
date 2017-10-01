const path = require('path');
const express = require('express');

const mongoose = require('./db/mongoose');
const userController = require('./controllers/userController');
const stockController = require('./controllers/stockController');

let app = express();

const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');

// allow cors incase someone clones and runs the react repo
app.all('/*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT, PATCH");
  next();
});

app.use(express.static(publicPath));

userController(app);
stockController(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
