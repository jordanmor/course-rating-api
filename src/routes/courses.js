const express = require('express');
const router = express.Router();
const mid = require('../middleware');
const { Course } = require('../models/course');
const { Review } = require('../models/review');
const { User } = require('../models/user');

// GET / - get all available courses from database
router.get('/', async (req, res) => {
  const courses = await Course.find().select('title');
  if (!courses) {
    const err = new Error('No courses in database.');
    err.status = 404;
    return next(err);
  }
  res.send(courses);
});

// POST / - create a new course - requires proper authorization
router.post('/', mid.authorizeUser, (req, res, next) => {
  // Add current authorized user's id to request body
  req.body.user = req.user._id;
  const course = new Course(req.body);
  course.save((err, course) => {
    if (err) {
      err.status = 400;
      return next(err);
    }
    res.location('/').status(201).end();
  });
});

// GET /:courseId - create a new course (requires proper authorization)
router.get('/:courseId', (req, res, next) => {
  Course
    .findById(req.params.courseId)
    .populate({
      path: 'reviews',
      // Populating across multiple levels
      populate: {
        path: 'user',
        select: '_id fullName' // deep population
      }
    })
    .populate('user', '_id fullName') // deep population
    .then(course => res.send(course))
    .catch(err => {
      err.message = 'The course with the given ID was not found.';
      err.status = 404;
      next(err);
    });
});

// PUT /:courseId - update course (requires proper authorization)
router.put('/:courseId', mid.authorizeUser, (req, res, next) => {
  
  Course
    .findById(req.params.courseId)
    .then(course => {
      // Users can only update their own courses
      course.validateUser(course.user, req.user, function(err) {
        if(err) {
          return next(err);
        } else {
          course.update(req.body, function(err, result){
            if(err) {
              return next(err);
            } else {
              res.status(204).end();
            }
          });
        }
      });
    });
});

// PUT /:courseId/reviews - create a review (requires proper authorization)
router.post('/:courseId/reviews', mid.authorizeUser, (req, res, next) => {

  Course
    .findById(req.params.courseId)
    .populate('reviews')
    .populate('user', '_id fullName') // deep population
    .then(course => {

      // Add current authorized user's id to request body
      req.body.user = req.user._id;

      const review = new Review(req.body);

      // Prevent users from reviewing their own course
      review.validateUser(course.user, review.user, function(err) {
        if(err) {
          return next(err);
        } else {
          review.save((err, review) => {
            if (err) {
              err.status = 400;
              return next(err);
            } else {
              course.reviews.push(review);
              course.save((err, course) => {
                if (err) {
                  err.status = 400;
                  return next(err);
                } else {
                  res.location(`/api/courses/${req.params.courseId}`).status(201).end();
                }
              });
            }
          });
        }
      });
    
    }).catch(err => {
      err.message = 'The course with the given ID was not found.';
      err.status = 404;
      next(err);
    });
});

module.exports = router;