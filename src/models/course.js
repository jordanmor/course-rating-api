const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, 
    ref: 'User'  
  },
  title: {
    type: String,
    required: [true, 'Course title is required']
  },
  description: {
    type: String,
    required: [true, 'A course description is required']
  },
  estimatedTime: String,
  materialsNeeded: String,
  steps: [{
    stepNumber: Number,
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }]
});

// Users can only update their own courses
CourseSchema.method('validateUser', function(courseCreator, user, callback) {
  // compare ObjectIDs with Mongoose's .equals() method
  if (!courseCreator._id.equals(user._id)) {
    const err = new Error('You are not authorized to update this course');
    err.status = 401;
    callback(err);
  } else {
    callback();
  }
});

const Course = mongoose.model('Course', CourseSchema);

module.exports.Course = Course;