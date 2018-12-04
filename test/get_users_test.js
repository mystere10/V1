import chai from 'chai';

import request from 'supertest';

import app from '../src/index';

const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();

beforeEach('Registering a user into the system', (done) => {
  const user = {
    fname: 'Sylvie',
    lname: 'Ishimwe',
    email: 'sylvie@gmail.com',
    phone: '0784357799',
    password: 'ishimwe123',
  };
  chai.request(app).post('/api/v1/auth/signup').send(user).end((error, res) => {
    if (error) done(error);
    done();
  });
});

describe('TEST TO GET USERS', () => {
  it('It should get all users redisted in the system', (done) => {
    request(app)
      .get('/api/v1/users')
      .expect(200)
      .end(done);
  });

  describe('TEST TO GET A SPECIFIC USER', () => {
    it('It should a specific user', (done) => {
      request(app)
        .get('/api/v1/users/1')
        .expect(200)
        .end(done);
    });
  });
});

describe('TEST TO GET USERS', () => {
  it('It should return all users from the database', (done) => {
    chai.request(app).get('/api/v1/users').end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });
  it('It should return a particular user', (done) => {
    chai.request(app).get('/api/v1/users/1').end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
});
