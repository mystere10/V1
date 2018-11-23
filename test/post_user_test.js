import chai from 'chai';

import request from 'supertest';

import app from '../src/index';

describe('ENDPOINT TEST', () => {
  it('It should register an new user into the system', (done) => {
    request(app)
      .post('/api/v1/users')
      .send({
        fname: 'kamali',
        lname: 'yves',
        email: 'kama@gmail.com',
        password: 'kama123',
        status: 'user',
      })
      .expect(200)
      .end(done);
  });

  it('It should login a user in order to create orders', (done) => {
    request(app)
      .post('/api/v1/users')
      .send({
        email: 'nkunziinnocent@gmail.com',
        password: 'nkunzi123',
      })
      .expect(200)
      .end(done);
  });
});
