const mongoose = require('mongoose');
const config = require('./config.json')

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.user}:${config.pass}@ds147510.mlab.com:47510/stockapp`);

module.exports = mongoose;