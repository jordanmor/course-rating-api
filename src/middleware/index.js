const auth = require('basic-auth');
const { User } = require('../models/user');

// Gets user credentials from Authorization header set on the request
function authorizeUser(req, res, next) {
  const credentials = auth(req);
  if(credentials) {
    User.authenticate(credentials.name, credentials.pass, function (err, user) {
      if (err || !user) {
        var err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      } else {
          req.user = user;
          return next();
      }
    });
  } else {
    const err = new Error('Please enter a valid email and password.');
    err.status = 401;
    return next(err);
  }
 
}

module.exports.authorizeUser = authorizeUser;