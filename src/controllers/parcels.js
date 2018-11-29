import uuid from 'uuid/v1';
import jwt from 'jsonwebtoken';
import db from '../db/connect';
import 'babel-polyfill';
import verifyToken from '../helpers/auth';

const getAllParcels = (req, res) => {
  db.query('SELECT * FROM orders')
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

export default{
  getAllParcels,
};