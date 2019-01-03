import chai from 'chai';

import request from 'supertest';

import app from '../src/index';

const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const should = chai.should();
describe('ENDPOINT TEST', () => {
  it('It should register an new user into the system', (done) => {
    request(app)
      .post('/api/v1/auth/signupn')
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

  it('It should login a user in order to create orders', (done) => {
    request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'nkunziinnocent@gmail.com',
        password: 'nkunzi123',
      })
      .expect(200)
      .end(done);
  });
});

beforeEach('Clear data from database', (done) => {
  chai.request(app).delete('/api/v1/users').end((error, res) => {
    if (error) done(error);
    done();
  });
});

describe('It should test creating a user', () => {
  it('Created user successfully', (done) => {
    const user = {
        fname: 'Sylvie',
        lname: 'Ishimwe',
        email: 'sylvie@gmail.com',
        phone: '0784357799',
        password: 'ishimwe123',
    };
    chai.request(app).post('/api/v1/auth/signup').send(user).end((error, res) => {
      if (error) done(error);
      res.body.should.be.a('object');
      res.body.should.have.property('message').eql('user registered successfully');
      res.body.response.should.have.property('name').eql('Yves');
      res.body.response.should.have.property('email').eql('alfheaagd@gmail.com');
      done();
    });
  });
});
  describe('Should test invalid fields', () => {
    it('An invalid name error', (done) => {
      const user = {
        fname: '',
        lname: 'yves',
        email: 'kama@gmail.com',
        password: 'kama123',
        status: 'user',
      };
      chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
        if (error) done(error);
        res.body.should.have.property('message').eql('Invalid name, the name is required');
        done();
      });
    });
    it('An invalid email error', (done) => {
      const user = {
          fname: 'Sylvie',
          lname: 'Ishimwe',
          email: 'sylvie@gmail.com',
          phone: '0784357799',
          password: 'ishimwe123',
        };
      chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
        if (error) done(error);
        res.body.should.have.property('message').eql('Invalid email, the email should start with letter');
        done();
      });
    });
  });
  describe('It should test missing fields errors', () => {
    it('A missing name error', (done) => {
      const user = {
        lname: 'yves',
        email: 'kama@gmail.com',
        password: 'kama123',
        status: 'user',
      };
      chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('fname is not allowed to be empty');
        done();
      });
    });
    it('A missing email error', (done) => {
      const user = {
          fname: 'Sylvie',
          lname: 'Ishimwe',
          email: 'sylvie@gmail.com',
          phone: '0784357799',
          password: 'ishimwe123',
        }
      chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('fname is not allowed to be empty');
        done();
      });
    });
    it('A missing password error', (done) => {
      const user = {
          fname: 'Sylvie',
          lname: 'Ishimwe',
          email: 'sylvie@gmail.com',
          phone: '0784357799',
          password: 'ishimwe123',
        };
      chai.request(app).post('/api/v1/users/signup').send(user).end((error, res) => {
        if (error) done(error);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('fname is not allowed to be emptys');
        done();
      });
    });
  });
