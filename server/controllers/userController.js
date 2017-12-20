const User = require('../models/user');
const mongoose = require('../db/mongoose');

// get user info
exports.getUser = (req, res) => {
  User.find({ username: req.params.uname })
    .then(data => {
      if (!data.length) {
        res.status(404).send();
      }
      res.send(data);
    })
    .catch(e => {
      res.status(400).send();
    });
};

// update user info
exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(data => {
      if (!data) {
        res.status(404).send();
      }
      res.send({ data });
    })
    .catch(e => {
      res.status(400).send();
    });
};
