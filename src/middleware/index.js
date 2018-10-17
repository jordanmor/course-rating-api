const auth = require('basic-auth');
const { User } = require('../models/user');

function checkAuthorization(req, res, next) {
  const credentials = auth(req);
  if(credentials) {
    User.authenticate(credentials.name, credentials.pass, function (err, user) {
      if (err || !user) {
        var err = new Error('Wrong email or password');
        err.status = 401;
        return next(err);
      } else {
          req.currentAuthUser = user;
          return next();
      }
    });
  } else {
    const err = new Error('Authorization is required.');
    err.status = 401;
    return next(err);
  }
 
}

module.exports.checkAuthorization = checkAuthorization;