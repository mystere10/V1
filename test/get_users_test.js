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

  describe('TEST FOR GET USERS', () => {
    it('It should get all users redisted in the system', (done) => {
      request(app)
        .get('/api/v1/users')
        .expect(202)
        .end(done);
    });
  });
});
