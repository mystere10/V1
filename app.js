
// import usersRoutes from './usersRoutes';

const express = require('express');

const usersRoutes = require('./usersRoutes');

// Init app

const app = express();

app.use(express.json());

// PARCEL ORDERS

const deliveryOrder = [

  {
    id: 1,
    receipient_name: 'Peace',
    weight: '1kg',
    destinationTown: 'Noirobi',
    destinationCountry: 'Kanya',
    postcode: '101',
    phone: '0784354333',
    status: 'In transit',
  },
];

/*
############################
    ROUTE RENDERING
############################

*/

app.use('/api/v1/users', usersRoutes.login);

app.use('/api/v1/users', usersRoutes.register);

// CREATE PARCEL DELIVERY ORDER

app.post('/api/v1/create_delivery_order', (req, res) => {
  const order = {
    id: deliveryOrder.length + 1,
    receipient_name: req.body.receipient,
    weight: req.body.weight,
    destinationTown: req.body.destinationTown,
    destinationCountry: req.body.destinationCountry,
    postcode: req.body.postcode,
    phone: req.body.phone,
    status: 'In transit',
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

app.get('/api/v1/get_order/:id', (req, res) => {
  const order = deliveryOrder.find(o => o.id === parseInt(req.params.id, 10));

  if (!order) res.status(404).send('The order you requested was not found.');
  res.send(order);
});

// CHANGE THE DESTINATION OF THE PARCEL

app.put('/api/v1/change_destination/:id', (res, req) => {
  const order = deliveryOrder.find(o => o.id === parseInt(req.params.id, 10));

  if (!order) return res.status(404).send('The order you requested was not found.');

  order.receipient_name = req.body.receipient_name;
  order.weight = req.body.weight;
  order.destinationTown = req.body.destinationTown;
  order.destinationCountry = req.body.destinationCountry;
  order.postcode = req.body.postcode;
  order.phone = req.body.phone;
});

// CHANGE THE STATUS OF AN ORDER
app.put('/api/v1/change_status/:id', (res, req) => {
  const order = deliveryOrder.find(o => o.id === parseInt(req.params.id, 10));
  if (!order) return res.status(404).send('The order you requested was not found.');

  order.status = req.body.status;
});

// DELETING AN ORDER
app.delete('/api/v1/deleteOrder/:id', (req, res) => {
  const order = deliveryOrder.find(o => o.id === parseInt(req.params.id, 10));
  if (!order) return res.status(404).send('The order you requested was not found.');

  const index = deliveryOrder.indexOf(order);
  deliveryOrder.splice(index, 1);
  return order;
});


// PORT ASSIGNATION
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
