const express = require('express');
const router = express.Router();
const mid = require('../middleware');
const { User } = require('../models/user');

// GET / return currently authenticated user
router.get('/', mid.authorizeUser, (req, res) => {
  res.status(200).send(req.user);
});

// POST / create new user
router.post('/', function(req, res, next) {

    // Create an instance of a user
    const user = new User({
      fullName: req.body.fullName,
      emailAddress: req.body.emailAddress,
      password: req.body.password
    });
    // Save document to MongoDB
    user.save((err, user) => {
      if (err) {
        err.status = 400;
        return next(err);
      }
      res.location('/').status(201).end();
    });
});

module.exports = router;