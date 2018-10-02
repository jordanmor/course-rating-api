const express = require('express');
const router = express.Router();
const models = require('../models');
const { User } = models;

router.get('/', (req, res) => {
    res.send('User');
});

module.exports = router;