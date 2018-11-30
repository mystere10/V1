import chai from 'chai';

import request from 'supertest';

import app from '../src/index';

describe('TEST FOR GET USERS', () => {
  it('It should get all users redisted in the system', (done) => {
    request(app)
      .get('/api/v1/users')
      .expect(202)
      .end(done);
  });

  describe('TEST TO GET A SPECIFIC USER', () => {
    it('It should a specific user', (done) => {
      request(app)
        .get('/api/v1/users/8cd981b0-eb3c-11e8-9db2-25ea4fd7f1bu')
        .expect(202)
        .end(done);
    });
  });
});

before('Create data', (done) => {
  const user = {
    fname: 'Sylvie',
    lname: 'Ishimwe',
    email: 'sylvie@gmail.com',
    phone: '0784357799',
    password: 'ishimwe123',
  };
  chai.request(app).post('/api/v1/users').send(user).end((error, res) => {
    if (error) done(error);
    done();
  });
});

describe('It should test fetching all users', () => {
  it('It should return the list of all user', (done) => {
    chai.request(app).get('/api/v1/users').end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
  it('It should return a particular user', (done) => {
    chai.request(app).get('/api/v1/users/:id').end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
});
