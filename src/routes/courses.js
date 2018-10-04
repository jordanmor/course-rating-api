const express = require('express');
const router = express.Router();
const { Course } = require('../models/course');
const { Review } = require('../models/review');
const { User } = require('../models/user');


router.get('/', (req, res) => {
    Course.find().select('title').then(courses => res.send(courses));
});

router.get('/:courseId', (req, res) => {
  Course.findById(req.params.courseId)
    .populate({
      path: 'reviews',
      // Populating across multiple levels
      populate: {
        path: 'user',
        select: '_id fullName' // deep population
      }
    })
    .populate('user', '_id fullName') // deep population
    .then(data => res.send(data));
});

module.exports = router;