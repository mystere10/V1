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
});

describe('It should test parcel creation', () => {
  beforeEach('Clear data from database', (done) => {
    chai.request(app).delete('/api/v1/parcels').end((error, res) => {
      if (error) done(error);
      done();
    });
  });
  describe('Successful order creation', () => {
    it('It should acknowledge that parcel was created with created object', (done) => {
      const order = {
        receipientName: 'Olivier',
        weight: 1,
        destinationTown: 'Noirobi',
        destinationCountry: 'Kanya',
        postcode: 101,
        phone: '0784354333',
        status: 'In transit',
      };
      chai.request(app).post('/api/v1/parcels').send(order).end((error, res) => {
        if (error) done(error);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('The order was successfully created');
        res.body.should.have.property('response');
        res.body.response.should.have.property('receipientName').eql('receipientName');
        res.body.response.should.have.property('weight').eql(1);
        res.body.response.should.have.property('destinationTown').eql('Noirobi');
        res.body.response.should.have.property('destinationCountry').eql('Kanya');
        res.body.response.should.have.property('postcode').eql('0784354333');
        res.body.response.should.have.property('status').eql('In transit');
        done();
      });
    });
  });

  describe('invalid input', () => {
    it('It should display an invalid weight error', (done) => {
      const parcel = {
        receipientName: 'Olivier',
        weight: '1',
        destinationTown: 'Noirobi',
        destinationCountry: 'Kanya',
        postcode: 101,
        phone: '0784354333',
        status: 'In transit',
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid weight, the weight should be number');
        done();
      });
    });

    it('It should display an invalid name error', (done) => {
      const parcel = {
        receipientName: 'Olivier',
        weight: '1',
        destinationTown: 'Noirobi',
        destinationCountry: 'Kanya',
        postcode: 101,
        phone: '0784354333',
        status: 'In transit',
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        res.should.have.status(403);
        res.body.should.be.a('object');
        // res.body.should.have.property('message').eql('Invalid name, the name should start with a letter');
        done();
      });
    });

    it('It should display an invalid origin error', (done) => {
      const parcel = {
        receipientName: 'Olivier',
        weight: '1',
        destinationTown: 'Noirobi',
        destinationCountry: 'Kanya',
        postcode: 101,
        phone: '0784354333',
        status: 'In transit',
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid origin, the origin should be a place');
        done();
      });
    });

    it('It should display an invalid destination error', (done) => {
      const id = uuidv1();
      const parcel = {
        id,
        name: 'Tshirts',
        origin: 'Kabarore',
        destination: '122331',
        userId: 3,
        weight: 0.3,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Invalid destination, the destination should be a place');
        done();
      });
    });
  });


  describe('Absence of a field', () => {
    it('It should display a missing name error', (done) => {
      const id = uuidv1();
      const parcel = {
        id,
        origin: 'Matambi',
        destination: 'Muramba',
        userId: 3,
        weight: 1,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please provide all the required fields');
        done();
      });
    });
    it('It should display missing origin error', (done) => {
      const id = uuidv1();
      const parcel = {
        id,
        name: 'T-shirts',
        destination: 'Muramba',
        userId: 3,
        weight: 1,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please provide all the required fields');
        done();
      });
    });
    it('It should display missing destination error', (done) => {
      const id = uuidv1();
      const parcel = {
        id,
        name: 'T-shirts',
        origin: 'Matambi',
        userId: 3,
        weight: 3,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please provide all the required fields');
        done();
      });
    });
    it('It should display missing userId error', (done) => {
      const id = uuidv1();
      const parcel = {
        id,
        name: 'T-shirts',
        origin: 'Matambi',
        destination: 'Kigali',
        weight: 1,
      };
      chai.request(app).post('/api/v1/parcels').send(parcel).end((error, res) => {
        if (error) done(error);
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Please provide all the required fields');
        done();
      });
    });
  });
});