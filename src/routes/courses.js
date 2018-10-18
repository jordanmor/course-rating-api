const express = require('express');
const router = express.Router();
const mid = require('../middleware');
const { Course } = require('../models/course');
const { Review } = require('../models/review');
const { User } = require('../models/user');


router.get('/', async (req, res) => {
  const courses = await Course.find().select('title');
  res.send(courses);
});

router.post('/', mid.checkAuthorization, (req, res, next) => {
  // Add current authorized user's id to request body
  req.body.user = req.currentAuthUser._id;
  const course = new Course(req.body);
  course.save((err, course) => {
    if (err) {
      err.status = 400;
      return next(err);
    }
    res.location('/').status(201).end();
  });
});

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

router.put('/:courseId', mid.checkAuthorization, (req, res, next) => {
  Course.findOneAndUpdate(
    { _id: req.params.courseId }, 
    req.body, 
    (err, course) => {
      if(err) {
        err.status = 400;
        return next(err);
      }
      res.status(204).end();
    });
});

router.post('/:courseId/reviews', mid.checkAuthorization, (req, res, next) => {

  Course
    .findById(req.params.courseId)
    .populate('reviews')
    .populate('user', '_id fullName')
    .then(course => {
      // Prevent users from reviewing their own course
      // compare ObjectIDs with the Mongoose's .equals() method
      if (course.user._id.equals(req.currentAuthUser._id)) {
        const err = new Error('Users can not review their own course.');
        err.status = 400;
        return next(err);
      } 

      // Add current authorized user's id to request body
      req.body.user = req.currentAuthUser._id;

      const review = new Review(req.body);
      course.reviews.push(review);
    
      review.save((err, review) => {
        if (err) {
          err.status = 400;
          return next(err);
        }
        course.save((err, course) => {
          if (err) {
            err.status = 400;
            return next(err);
          } else {
            res.location(`/api/courses/${req.params.courseId}`).status(201).end();
          }
        });
      });
    }).catch(err => console.log(err));
});

module.exports = router;