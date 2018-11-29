import uuid from 'uuid/v1';
import jwt from 'jsonwebtoken';
import db from '../db/connect';
import 'babel-polyfill';
import verifyToken from '../helpers/auth';

const createParcel = (req, res) => {
  const {
    userid, reciepientname, weight, destinationtown, destinationcountry, postcode, phone,
  } = req.body;

  if (userid === ' ' || userid === null) {
    res.status(403).send('Please your valid id');
  }
  if (reciepientname < 3) {
    res.status(403).send('The name should not be below three characters ');
  }

  if (weight === '' || weight === null) {
    res.status(403).send('Plese enter the weight of your parcel');
  }

  if (typeof (weight) !== 'number') {
    res.status(403).send('Please enter only numbers');
  }

  if (destinationtown === '' || destinationtown === null) {
    res.status(403).send('Plese enter the destination town');
  }

  if (destinationcountry === '' || destinationcountry === null) {
    res.status(403).send('Plese enter the destination country');
  }

  if (postcode === '' || postcode === null) {
    res.status(403).send('Plese enter the destination postcode');
  }

  if (phone === '' || phone === null) {
    res.status(403).send('Plese enter the destination postcode');
  } else {
    const status = 'in transit';
    const query = 'INSERT INTO orders(userid, reciepientname, weight, destinationtown, destinationcountry, status, postcode, phone)values($1,$2,$3,$4,$5,$6,$7,$8)';
    db.query(query, [userid, reciepientname, weight, destinationtown, destinationcountry, status, postcode, phone])
      .then((response) => {
        res.status(201).send({ message: 'Parcel ordered successfully', orders: response.rows[0] });
      })
      .catch((error) => {
        res.send({ message: 'Not inserted' });
        console.log(error);
      });
  }
};

export default {
  createParcel,
}
