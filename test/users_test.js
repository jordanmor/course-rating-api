const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../src/index');
const { User } = require('../src/models/user');

const { expect } = chai;
chai.use(chaiHttp);

// Test suite
describe('GET /api/users', function () {

  // Data used to create a new user in the database and test if that user is found with a GET request
  const fullName = 'Harry Potter';
  const emailAddress = 'harrypotter@hogwarts.com';
  const password = 'magic';

  it('should return the corresponding user document when using correct credentials', done => {

    // create a user to save into the database and test
    const user = new User({ fullName, emailAddress, password});

    user.save(function(err, user) {
      chai.request(app)
        .get('/api/users')
        // Authenticate with Basic authentication
        .auth(emailAddress, password)
        .end( function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          /* Since each email address in the database is unique, 
          a match proves the same user designated above was returned in the response */
          expect(res.body).to.have.property('emailAddress').eql(emailAddress);
          done();
        });
    });
  });

  it('should return a 401 status error when using invalid credentials', done => {
    chai.request(app)
      .get('/api/users')
      // No Basic authentication used
      .end( (err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  after(function() {
    // Delete user from database after unit tests complete
    User.findOneAndDelete({emailAddress}, function(err, user) {
      if(err) {throw err };
    });
  })

});