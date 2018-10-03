const express = require('express');
const router = express.Router();
const models = require('../models');
const { Review } = models;

router.get('/', (req, res) => {
    res.send('Reviews');
});

module.exports = router;