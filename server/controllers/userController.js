const User = require('../models/user');
const bodyParser = require('body-parser');
const mongoose = require('../db/mongoose');

var urls = {
  getUsers: '/api/users',
  getUser: '/api/users/:uname',
  newUser: '/api/users',
  deleteUser: '/api/users/:id',
  updateUser: '/api/users/:id'
};

module.exports = (app) => {

    app.use(bodyParser.json());

    //get all users
    app.get(urls.getUsers, (req, res) => {

        User.find().then((data) => {
            if (!data.length) {
                res.status(404).send();
            }
            res.send({ data });
        }).catch((e) => {
            res.status(400).send();
        });

    });

    //get user by username
    app.get(urls.getUser, (req, res) => {

        User.find({ username: req.params.uname }).then((data) => {
            if (!data.length) {
                res.status(404).send();
            }
            res.send( data );
        }).catch((e) => {
            res.status(400).send();
        });

    });

    //post new user
    app.post(urls.newUser, (req, res) => {

        let user = new User({
            username: req.body.username
        });

        user.save().then((data) => {
            res.send({ data });
        }).catch((e) => {
            res.status(400).send();
        });

    });

    //delete user by id
    app.delete(urls.deleteUser, (req, res) => {

        User.findByIdAndRemove(req.params.id).then((data) => {
            if (!data) {
                res.status(404).send();
            }
            res.send({ data });
        }).catch((e) => {
            res.status(400).send();
        });

    });

    //update user info
    app.patch(urls.updateUser, (req, res) => {

        User.findByIdAndUpdate(req.params.id,
          {$set: req.body}, {new: true}).then((data) => {
            if (!data) {
                res.status(404).send();
            }
            res.send({ data });
        }).catch((e) => {
            res.status(400).send();
        });

    });

};
