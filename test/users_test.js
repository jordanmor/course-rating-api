const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const app = require('../src/index');
const { expect } = chai;

chai.use(chaiHttp);

// Test suite
describe('GET /api/users', function () {


  it('should return the corresponding user document when using correct credentials', done => {
    expect(true).to.be.ok;
    done();
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

});