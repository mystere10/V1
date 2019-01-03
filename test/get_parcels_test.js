import chai from 'chai';
import request from 'supertest';
import app from '../src/index';

const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const should = chai.should();

beforeEach('Insert a moch oder for testing', (done) => {
  const parcelOrder = {
    userid: 1,
    reciepientname: 'nkunzi',
    weight: 2,
    destinationtown: 'nairobi',
    destinationcountry: 'kenya',
    postcode: '109',
    phone: '078432222',
  };
  chai.request(app).post('/api/v1/parcels').send(parcelOrder).end((error, res) => {
    if (error) done(error);
    done();
  });
});

// afterEach('Deleting all the oders ', (done) => {
//   chai.request(app).delete('/api/v1/parcels').end((error, res) => {
//     if (error) done(error);
//     done();
//   });
// });

describe('Test to get parcel orders ', () => {
  before('make an order', (done) => {
    const order = { 
      id: 20,
      userid: 1,
      reciepientname: 'nkunzi',
      weight: 5,
      destinationtown: 'nairobi',
      destinationcountry: 'kenya',
      postcode: '109',
      phone: '078432222',
    };
    chai.request(app).post('/api/v1/parcels').send(order).end((error, res) => {
      if (error) done(error);
      done();
    });
  });
  
  it('it should return an order by their id', (done) => {
    const id = 20;
    chai.request(app).get(`/api/v1/parcels/${id}`).end((error, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      // res.body.should.have.property('userid').eql(1);
      // res.body.should.have.property('reciepientname').eql('nkunzi');
      // res.body.should.have.property('weight').eql('5');
      // res.body.should.have.property('postcode').eql('109');
      // res.body.should.have.property('phone').eql('078432222');
      done();
    });
  });

  it('it should return all orders created ', (done) => {
    chai.request(app).get('/api/v1/parcels').end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('object');

      done();
    });
  });

  it('it should return orders by a user id', (done) => {
    const id = 2;
    chai.request(app).get(`/api/v1/users/${id}/parcels`).end((error, res) => {
      if (error) done(error);
      res.should.have.status(200);
      res.body.should.be.a('object');
      done();
    });
  });
});
