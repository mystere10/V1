import uuid from 'uuid/v1';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import db from '../db/connect';

const login = (req, res) => {
  const { email, password } = req.body;

  const schema = {
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  };
  // Demonstations from npm joi
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send({ message: result.error.details[0].message });
    return;
  }
  db.query('SELECT * FROM registration WHERE email=$1 and password=$2', [email, password])
    .then((response) => {
      jwt.sign({ response: response.rows[0] }, 'secretkey', (err, token) => {
        res.json({
          token,
          message: 'Weclome this is your token',
        });
      });
    }).catch((error) => {
      res.status(403).send('Email or password not correct');
      console.log(error);
    });
};

const register = (req, res) => {
  const {
    fname, lname, email, phone, password,
  } = req.body;

  const schema = {
    fname: Joi.string().alphanum().min(3).max(30)
      .required(),
    lname: Joi.string().alphanum().min(3).max(30)
      .required(),
    email: Joi.string().email({ minDomainAtoms: 2 }),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    phone: Joi.number().integer().min(10),
  };

  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send({ message: result.error.details[0].message });
    return;
  }

  const user = 'user';
  const query = 'INSERT INTO registration(fname, lname, email, phone, password, function)values($1,$2,$3,$4,$5,$6) returning*';
  db.query(query, [fname, lname, email, phone, password, user])
    .then((response) => {
      jwt.sign({ response: response[0] }, 'secretkey', (err, token) => {
        res.status(201).send({ message: 'user registered successfully', user: response.rows[0], token });
      });
    })
    .catch((error) => {
      res.send({ message: 'Not inserted' });
      console.log(error);
    });
};

export default {
  login,
  register,
};
