const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post('/', function(req, res, next) {
    // Confirm that user typed same password twice
    if (req.body.password !== req.body.confirmPassword) {
      const err = new Error('Passwords do not match.');
      err.status = 400;
      return next(err);
    }

    // Create an instance of a user and save document to Mongo
    const user = new User({
      emailAddress: req.body.emailAddress,
      fullName: req.body.fullName,
      password: req.body.password
    });

    user.save((err, user) => {
      if (err) {
        err.status = 400;
        return next(err);
      }
      res.location('/').status(201).end();
    });
});

module.exports = router;