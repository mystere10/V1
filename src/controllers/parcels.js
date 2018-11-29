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
    const query = 'INSERT INTO orders(userid, reciepientname, weight, destinationtown, destinationcountry, status, postcode, phone)values($1,$2,$3,$4,$5,$6,$7,$8) returning*';
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

const getOneParcel = (req, res) => {
  const { id } = req.params;
  parseInt(id, 10);

  const parcel = db.query('SELECT * FROM orders WHERE id=$1', [id]);
  parcel.then((response) => {
    if (!response) {
      res.status(400).send({ message: `The parcel with the "${id}" does not exist` });
    } else {
      res.status(200).send({ message: `The parcel with the "${id}" was successfully returned`, parcel: response.rows[0] });
    }
  }).catch((error) => {
    res.status(403).send(error);
    console.log(error);
  });
};


const changeStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  parseInt(id, 10);
  const row = db.query('UPDATE orders SET status=$1 WHERE id=$2', [status, id]);
  row.then((response) => {
    if (response) {
      res.status(200).send({ message: 'The parcel was successfully updated' });
    } else {
      res.status(400).send({ message: 'The parcel was not updated' });
    }
  }).catch((error) => {
    res.send(error);
  });
};

const preLocation = (req, res) => {
  const { id } = req.params;
  const { presentlocation } = req.body;

  parseInt(id, 10);
  const row = db.query('UPDATE orders SET presentLocation=$1 WHERE id=$2', [presentlocation, id]);
  row.then((response) => {
    if (response) {
      res.status(200).send({ message: 'The parcel present location was successfully updated' });
    } else {
      res.status(400).send({ message: 'The parcel present location was not updated' });
    }
  }).catch((error) => {
    res.send(error);
  });
};

const changeDestination = (req, res) => {
  jwt.verifify(req.token, 'secretkey', (err, authdata) => {
    if (err) {
      res.status(403);
    } else {
      const { id } = req.params;
      const { destinationtown, destinationcountry } = req.body;

      parseInt(id, 10);
      const row = db.query('UPDATE orders SET destinationtown=$1, destinationcountry=$2 WHERE id=$3', [destinationtown, destinationcountry, id]);
      row.then((response) => {
        if (response) {
          res.status(200).send({ message: 'The parcel destination was successfully changed' });
        } else {
          res.status(400).send({ message: 'The parcel destination was not changed' });
        }
      }).catch((error) => {
        res.send(error);
      });
    }
  });
};

export default {
  createParcel,
  getAllParcels,
  getOneParcel,
  preLocation,
  changeDestination,
  changeStatus,
};
