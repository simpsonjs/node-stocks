const mongoose = require('mongoose');

const User = mongoose.model('users', {
  username: {
    type: String,
    required: true,
    trim: true
  },
  tickers: {
    type: Array,
    required: true,
    trim: true
  }
});

module.exports = User;
