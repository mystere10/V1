import chai from 'chai';
import request from 'supertest';
import app from '../src/index';
const should = chai.should();

beforeEach('Data structure to store moch data', (done) => {
  const parcelOrder = {
    userid: 1,
    reciepientname: 'nkunzi',
    weight: 1.5,
    destinationtown: 'nairobi',
    destinationcountry: 'kenya',
    status: 'in transit',
    postcode: '109',
    phone: '078432222',
  };
  chai.request(app).post('/api/v1/parcels').send(parcelOrder).end((error, res) => {
    if (error) done(error);
    done();
  });
});

afterEach('Remove parcelOders ', (done) => {
  chai.request(app).delete('/api/v1/parcels').end((error, res) => {
    if (error) done(error);
    done();
  });
});

describe('TEST TO GET PARCELS ', () => {
  let id;
  before('Create a record', (done) => {
    const order = { 
      userid: 1,
      reciepientname: 'nkunzi',
      weight: 1.5,
      destinationtown: 'nairobi',
      destinationcountry: 'kenya',
      status: 'in transit',
      postcode: '109',
      phone: '078432222',
    };
    chai.request(app).post('/api/v1/parcels').send(order).end((error, res) => {
      if (error) done(error);
      done();
    });
  });

  it('it should return all orders created ', (done) => {
    chai.request(app).get('/api/v1/parcels').end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });

  it('it should return orders by a user id', (done) => {
    id = '3';
    chai.request(app).get(`/api/v1/users/${id}/parcels`).end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('array');
      done();
    });
  });
});
