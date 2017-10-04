const path = require('path');
const express = require('express');
const cors = require('cors');

const mongoose = require('./db/mongoose');
const userController = require('./controllers/userController');
const stockController = require('./controllers/stockController');

const app = express();

const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');

app.use(cors());
app.use(express.static(publicPath));

userController(app);
stockController(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
