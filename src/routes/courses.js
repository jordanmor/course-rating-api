const express = require('express');
const router = express.Router();
const models = require('../models');
// const { Course } = models;

router.get('/', (req, res) => {
    res.send('Courses');
});

module.exports = router;