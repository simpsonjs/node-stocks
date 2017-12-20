const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const mongoose = require('./db/mongoose');

const app = express();

const port = process.env.PORT || 8080;
const publicPath = path.join(__dirname, '../public');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(publicPath));

routes(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
