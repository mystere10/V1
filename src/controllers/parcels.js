import uuid from 'uuid/v1';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import db from '../db/connect';
import 'babel-polyfill';
import verifyToken from '../helpers/auth';

const createParcel = (req, res) => {
  const {
    userid, reciepientname, weight, destinationtown, destinationcountry, postcode, phone,
  } = req.body;

  const schema = {
    userid,
    reciepientname: Joi.string().alphanum().min(3).max(30)
      .required(),
    weight: Joi.number().integer()
      .required(),
    destinationtown: Joi.string().alphanum().min(3).max(30)
      .required(),
    destinationcountry: Joi.string().alphanum().min(3).max(30)
      .required(),
    postcode: Joi.string().alphanum().min(3).max(30),
    phone: Joi.number().integer().min(10),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    res.status(400).send({ message: result.error.details[0].message });
    return;
  }

  const status = 'in transit';
  const query = 'INSERT INTO orders(userid, reciepientname, weight, destinationtown, destinationcountry, status, postcode, phone)values($1,$2,$3,$4,$5,$6,$7,$8) returning*';
  db.query(query, [userid, reciepientname, weight, destinationtown, destinationcountry, status, postcode, phone])
    .then((response) => {
      res.status(201).send({ message: 'Parcel ordered successfully', orders: response.rows[0] });
    })
    .catch((error) => {
      res.status(400).send({ message: 'Not inserted' });
      console.log(error);
    });
};

const getAllParcels = (req, res) => {
  db.query('SELECT * FROM orders')
    .then((response) => {
      if (response.rows.length) {
        res.status(200).send({ message: 'All orders has been successfully returned', response: response.rows });
      } else {
        res.status(404).send({ message: 'No record found' });
      }
    })
    .catch((error) => {
      res.send(error);
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
      res.status(201).send({ message: 'The parcel was successfully updated' });
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
      res.status(201).send({ message: 'The parcel present location was successfully updated' });
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
          res.status(201).send({ message: 'The parcel destination was successfully changed' });
        } else {
          res.status(400).send({ message: 'The parcel destination was not changed' });
        }
      }).catch((error) => {
        res.send(error);
      });
    }
  });
};

// const deleteAllparcels = (req, res) => {
//   db.query('TRUNCATE orders RESTART IDENTITY CASCADE')
//     .then((response) => {
//       if (response) {
//         res.status(200).send({ message: 'The orders table is now empty' });
//       } else {
//         res.status(400).send({ message: 'The action could not terminate' });
//       }
//     }).catch((error) => {
//       res.send(error);
//     });
// };

export default {
  createParcel,
  getAllParcels,
  getOneParcel,
  preLocation,
  changeDestination,
  changeStatus,
  // deleteAllparcels,
};
