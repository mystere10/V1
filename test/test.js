import chai from 'chai';

import request from 'supertest';

import app from '../src/index';

/*
  ##############################
  TESTING PARCEL ORDER ENDPOINTS
  ##############################
*/

describe('ENDPOINT TEST', () => {
  it('It should get all parcels orders', (done) => {
    request(app)
      .get('/api/v1/parcels')
      .expect(200)
      .end(done);
  });

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
      .expect(200)
      .end(done);
  });

  it('It should return one percel by it ID', (done) => {
    request(app)
      .get('/api/v1/parcels/8cd981b0-eb3c-11e8-9db2-25ea4fd7f1bf')
      .expect(200)
      .end(done);
  });

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

  /*
  ###########################
    TESTING USER ENDPOINTS
  ###########################
  */

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

//   it('It should login a user in order to create orders', (done) => {
//     request(app)
//       .post('/api/v1/users')
//       .send({
//         email: 'nkunziinnocent@gmail.com',
//         password: 'nkunzi123',
//       })
//       .expect(200)
//       .end(done);
//   });

//   it('It should get all users redisted in the system', (done) => {
//     request(app)
//       .get('/api/v1/users')
//       .expect(202)
//       .end(done);
//   });
});
