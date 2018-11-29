import uuid from 'uuid/v1';

import jwt from 'jsonwebtoken';

import db from '../db/connect';

const login = (req, res) => {
  const { email, password } = req.body;
  if (email === '' || null) {
    res.status(403).send({ message: 'Please enter your email' });
  }
  if (email.indexOf('@', 0) < 0) {
    res.status(403).send({ message: 'Please fill a valid email' });
  }
  if (email.indexOf('.', 0) < 0) {
    res.status(403).send({ message: 'Please fill a valid email' });
  }
  if (password === ' ' || password === null) {
    res.status(403).send({ message: 'Please fill out your password' });
  }
  if (password.length < 6) {
    res.status(403).send({ message: 'Plese the password need to be at least 6 charachers' });
  } else {
    db.query('SELECT * FROM registration WHERE email=$1 and password=$2', [email, password])
      .then((response) => {
        jwt.sign({ response: response[0] }, 'secretkey', (err, token) => {
          res.json({
            token,
            message: 'Weclome this is your token',
          });
        });
      }).catch((error) => {
        res.status(403).send('Email or password not correct');
        console.log(error);
      });
  }
};

const register = (req, res) => {
  const {
    fname, lname, email, phone, password,
  } = req.body;
  if (fname === '' || fname === null) {
    res.status(403).send('Please enter your First name');
  }
  if (fname.length < 3) {
    res.status(403).send('The name should be at least 3 characters');
  }
  if (lname === '' || fname === null) {
    res.status(403).send('Please enter your last name');
  }
  if (lname.length < 3) {
    res.status(403).send('The name should be at least 3 characters');
  }
  if (email === '' || null) {
    res.status(403).send('Please enter your email');
  }
  if (email.indexOf('@', 0) < 0) {
    res.status(403).send('Please fill a valid email');
  }
  if (email.indexOf('.', 0) < 0) {
    res.status(403).send('Please fill a valid email');
  }
  if (password === '' || password === null) {
    res.status(403).send('Please fill out your password');
  }
  if (password.length < 6) {
    res.status(403).send('Plese the password need to be at least 6 charachers');
  } else {
    const user = 'user';
    const query = 'INSERT INTO registration(fname, lname, email, phone, password, function)values($1,$2,$3,$4,$5,$6)';
    db.query(query, [fname, lname, email, phone, password, user])
      .then((response) => {
        res.status(201).send({ message: 'user registered successfully', response: response[0] });
      })
      .catch((error) => {
        res.send({ message: 'Not inserted' });
        console.log(error);
      });
  }
};

export default {
  login,
  register,
};
