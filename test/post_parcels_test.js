import chai from 'chai';

import request from 'supertest';

import app from '../src/index';

const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();

describe('It should if a parcel has been created', () => {
  beforeEach('Delete data already into the database', (done) => {
    chai.request(app).delete('/api/v1/parcels').end((error, res) => {
      if (error) done(error);
      done();
    });
  });

  describe('Test is an order was successfully created', () => {
    it('It should return a acknowledgement message', (done) => {
      const parcel = {      
        userId: 1,
        reciepientname: 'Kalisa',
        weight: 5,
        destinationtown: 'musanze',
        destinationcountry: 'Rwanda',
        postcode: '105',
        phone: '782143544',
      };
      chai.request(app).post('/api/v1/parcels').send(order).end((error, res) => {
        if (error) done(error);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Parcel ordered successfully');
        res.body.should.have.property('response');
        res.body.response.should.have.property('reciepientname').eql('Kalisa');
        res.body.response.should.have.property('weight').eql('5');
        res.body.response.should.have.property('destinationtown').eql('Rwanda');
        res.body.response.should.have.property('postcode').eql(105);
        res.body.response.should.have.property('phone').eql(782143544);
        done();
      });
    });
  });

  describe('invalid input', () => {
    it('It should display an invalid weight error', (done) => {
      const parcel = {
        userId: 1,
        reciepientname: 'Kalisa',
        weight: 'dfvb6543',
        destinationtown: 'musanze',
        destinationcountry: 'Rwanda',
        postcode: '105',
        phone: 782143544,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('weight must be a number"');
        done();
      });
    });

    it('It should throw a message in case destinationtown', (done) => {
      const parcel = {
        userId: 1,
        reciepientname: '',
        weight: 5,
        destinationtown: 'murunda',
        destinationcountry: 'Rwanda',
        postcode: '105',
        phone: 782143544,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('reciepientname is not allowed to be empty"');
        done();
      });
    });

    it('It should display an weight', (done) => {
      const parcel = {
        userId: 1,
        reciepientname: 'Kalisa',
        weight: 'oiuyt',
        destinationtown: 'musanze',
        destinationcountry: 'Rwanda',
        postcode: '105',
        phone: 782143544,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('weight must be a number');
        done();
      });
    });

    it('It should display an invalid destinationcountry error in case it is empty', (done) => {
      const parcel = {
        userId: 1,
        reciepientname: 'Kalisa',
        weight: 1.5,
        destinationtown: 'musanze',
        destinationcountry: '',
        postcode: '105',
        phone: 782143544,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('weight must be a number');
        done();
      });
    });
  });

  describe('In case no data is provided', () => {
    it('It should display a missing field', (done) => {
      const parcel = {
        userId: '',
        reciepientname: '',
        weight: '',
        destinationtown: '',
        destinationcountry: '',
        postcode: '',
        phone: '',
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('');
        done();
      });
    });
  });
});
