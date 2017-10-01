const mongoose = require('mongoose');

var User = mongoose.model('users', {
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
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
