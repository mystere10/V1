import chai from 'chai';

import request from 'supertest';

import app from '../src/index';

describe('ENDPOINT TEST TO GET PARCELS', () => {
  it('It should get all parcels orders', (done) => {
    request(app)
      .get('/api/v1/parcels')
      .expect(202)
      .end(done);
  });

  it('It should return one parcel by it ID', (done) => {
    request(app)
      .get('/api/v1/parcels/8cd981b0-eb3c-11e8-9db2-25ea4fd7f1bf')
      .expect(202)
      .end(done);
  });
});
