import uuid from 'uuid/v1';

import jwt from 'jsonwebtoken';

import db from '../db/connect';

import 'babel-polyfill';

const getAllUsers = (req, res) => {
  db.query('SELECT * FROM registration')
    .then((response) => {
      if (response.rows.length) {
        res.send(response.rows);
      } else {
        res.send({ message: 'No record found' });
      }
    })
    .catch((error) => {
      res.send({ message: 'No record found' });
      console.log(error);
    });
};

const getUserById = (req, res) => {
  const { id } = req.params;

  parseInt(id, 10);

  db.query('SELECT * FROM registration WHERE id=$1', [id])
    .then((response) => {
      res.status(200).send({ message: 'A user has be returned', userById: response.rows[0] });
    }).catch((error) => {
      res.send({ message: 'Not user found' });
      console.log(error);
    });
};

const deleteAllUsers = (req, res) => {
  db.query('TRUNCATE table registration')
    .then((response) => {
      res.status(200).send({ message: 'Table truncated', users: response.rows[0] });
    }).catch((error) => {
      res.status(403).send({ message: 'Table not truncated ' });
      console.log(error);
    });
};

const getParcelByUserId = (req, res) => {
  const { id } = req.params;

  const parcel = db.query('SELECT * FROM orders WHERE userid=$1', [id]);
  parcel.then((response) => {
    if (!response) {
      res.status(400).send({ message: `The parcel with the "${id}" does not exist` });
    } else {
      res.status(200).send({ message: `The parcel with the "${id}" was successfully returned`, orderByUser: response.rows[0] });
    }
  }).catch((error) => {
    res.status(403).send(error);
    console.log(error);
  });
};

export default {
  getAllUsers,
  getUserById,
  deleteAllUsers,
  getParcelByUserId,
};
