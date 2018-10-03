const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    emailAddress: {
        type: String,
        required: [true, 'An email address is required'],
        unique: true,
        validate: {
            validator: function(email) {
                return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    }
});

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

const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const Review = mongoose.model('Review', ReviewSchema);

module.exports.User = User;
module.exports.Course = Course;
module.exports.Review = Review;
