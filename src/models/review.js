const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: String
});

// Prevents users from reviewing their own courses
ReviewSchema.method('validateUser', function(courseUser, reviewer, callback) {
  // compare ObjectIDs with Mongoose's .equals() method
  if (courseUser._id.equals(reviewer._id)) {
    const err = new Error('Users cannot review their own course.');
    err.status = 401;
    callback(err);
  } else {
    callback();
  }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports.Review = Review;