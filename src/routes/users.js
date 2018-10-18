const express = require('express');
const router = express.Router();
const mid = require('../middleware');
const { User } = require('../models/user');

router.get('/', mid.checkAuthorization, (req, res) => {

  const currentAuthUser = {
    _id: req.currentAuthUser._id,
    fullName: req.currentAuthUser.fullName,
    emailAddress: req.currentAuthUser.emailAddress
  };
  res.status(200).send(currentAuthUser);
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