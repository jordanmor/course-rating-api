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

const User = mongoose.model('User', UserSchema);

module.exports.User = User;
