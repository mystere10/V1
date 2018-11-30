import chai from 'chai';

import request from 'supertest';

import app from '../src/index';


describe('TEST FOR PUT PARCELS', () => {
  it('It should edit any particular order by it ID', (done) => {
    request(app)
      .put('/api/v1/parcels/8cd981b0-eb3c-11e8-9db2-25ea4fd7f1bf')
      .send({
        receipientName: 'Mulisa',
        weight: 1,
        destinationTown: 'Noirobi',
        destinationCountry: 'Kanya',
        postcode: 101,
        phone: '0784354333',
        status: 'In transit',
      })
      .expect(202)
      .end(done);
  });

  it('It should cancel any particular order by it ID', (done) => {
    request(app)
      .put('/api/v1/parcels/8cd981b0-eb3c-11e8-9db2-25ea4fd7f1bf')
      .send({

        action: 'cancel',
      })
      .expect(202)
      .end(done);
  });
});
