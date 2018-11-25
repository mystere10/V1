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
