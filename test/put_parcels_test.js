import chai from 'chai';

import request from 'supertest';

import app from '../src/index';


describe('TEST FOR PUT PARCELS', () => {
  it('It should edit any particular order by it ID', (done) => {
    request(app)
      .put('/api/v1/parcels/1')
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
      .put('/api/v1/parcels/1')
      .send({
        action: 'cancel',
      })
      .expect(202)
      .end(done);
  });
});
