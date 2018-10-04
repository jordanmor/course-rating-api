const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.post('/', (req, res, next) => {
    const user = new User(req.body);
    user.save((err, user) => {
      if (err) {
        err.status = 400;
        return next(err);
      }
      res.location('/').status(201).end();
    });
  });

module.exports = router;