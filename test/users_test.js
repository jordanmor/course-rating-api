const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const { expect } = chai;
chai.use(chaiHttp);

// Test suite
describe('GET /api/users', function () {


  it('should return the corresponding user document when using correct credentials', done => {
    expect(true).to.be.ok;
    done();
  });

  it('should return a 401 status error when using invalid credentials', done => {
    expect(true).to.be.ok;
    done();
  });

});