import chai from 'chai';

import request from 'supertest';

import app from '../src/index';

describe('ENDPOINT TEST', () => {
  
    it('It should register an order from a user', (done) => {
        request(app)
          .post('/api/v1/parcels')
          .send({
            receipientName: 'Olivier',
            weight: 1,
            destinationTown: 'Noirobi',
            destinationCountry: 'Kanya',
            postcode: 101,
            phone: '0784354333',
            status: 'In transit',
          })
          .expect(201)
          .end(done);
      });
};