const express = require('express');

const router = express.Router();

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


// CREATE PARCEL DELIVERY ORDER

router.post('/create_delivery_order', (req, res) => {
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

router.get('/get_delivery_order', (req, res) => {
  res.send(deliveryOrder);
});

// GET SPECIFIC ORDER

router.get('/get_order/:id', (req, res) => {
  const order = deliveryOrder.find(o => o.id === parseInt(req.params.id, 10));

  if (!order) return res.status(404).send('The order you requested was not found.');
  res.send(order);
});

// CHANGE THE DESTINATION OF THE PARCEL

router.put('/change_destination/:id', (res, req) => {
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
router.put('/change_status/:id', (res, req) => {
  const order = deliveryOrder.find(o => o.id === parseInt(req.params.id, 10));
  if (!order) return res.status(404).send('The order you requested was not found.');

  order.status = req.body.status;
});

// DELETING AN ORDER
router.delete('/deleteOrder/:id', (req, res) => {
  const order = deliveryOrder.find(o => o.id === parseInt(req.params.id, 10));
  if (!order) return res.status(404).send('The order you requested was not found.');

  const index = deliveryOrder.indexOf(order);
  deliveryOrder.splice(index, 1);
  return order;
});

module.export = router;
