/* eslint-disable prefer-destructuring */
const express = require('express');

// Init app

const app = express();

app.use(express.json());

// RESIGISTRATION ARRAY
const registration = [
  {
    id: 1, f_name: 'nkunzi', lname: 'innocent', email: 'nkunziinnocent@gmail.com', password: 'nkunzi123', status: 'admin',
  },
  {
    id: 2, f_name: 'kamali', lname: 'yves', email: 'kama@gmail.com', password: 'kama123', status: 'user',
  },
];

// PARCEL ORDERS

const deliveryOrder = [

  {
    id: 1,
    receipient_name: 'Peace',
    weight: '1kg',
    town: 'Noirobi',
    country: 'Kanya',
    postcode: '101',
    phone: '0784354333',
  },
];

/*
############################
    ROUTE RENDERING
############################

*/


app.post('/api/v1/registration', (req, res) => {
  const user = {
    id: registration.length + 1,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.pass,
    status: 'user',
  };

  if (registration.push(user)) {
    res.send('Seccessfully registered');
  } else {
    res.send('Please try again latter');
  }
});

/*

#######################
        LOGIN
#######################

*/

app.post('/api/v1/login/:email/:password', (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const email = req.params.email;
  const password = req.params.password;

  for (let i = 0; i < registration.length; i += 1) {
    if (registration[i].email === email && registration[i].password === password && registration[i].status === 'admin') {
      res.send('Welcome Admin');
    } else if (registration[i].email === email && registration[i].password === password && registration[i].status === 'user') {
      res.send('Welcome costomer');
    }
  }
});


// GET ALL RESISTERED USERS

app.get('/api/v1/users', (req, res) => {
  res.send(registration);
});

// CREATE PARCEL DELIVERY ORDER

app.post('/api/v1/create_delivery_order', (req, res) => {
  const order = {
    id: deliveryOrder.length + 1,
    receipient_name: req.body.receipient,
    weight: req.body.weight,
    town: req.body.town,
    country: req.body.country,
    postcode: req.body.postcode,
    phone: req.body.phone,
  };
  if (deliveryOrder.push(order)) {
    res.send('Parcel ordered');
  } else {
    res.send('Plese try again');
  }
});

// GET PARCELS

app.get('/api/v1/get_delivery_order', (req, res) => {
  res.send(deliveryOrder);
});

// GET SPECIFIC ORDER

app.get('/api/v1/get_order/:id', (res, req) => {
  const order = deliveryOrder.find(f => f.id === parseInt(req.params.id, 10));

  if (!order) res.status(404).send('The order you requested was not found.');
  res.send(order);
});


// PORT ASSIGNATION
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
