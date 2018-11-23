import uuid from 'uuid/v1';

let deliveryOrder = [

  {
    id: '8cd981b0-eb3c-11e8-9db2-25ea4fd7f1bf',
    receipientName: 'Peace',
    weight: '1kg',
    destinationTown: 'Noirobi',
    destinationCountry: 'Kanya',
    postcode: '101',
    phone: '0784354333',
    status: 'In transit',
  },
];


const createParcel = (req, res) => {
  const order = {
    id: uuid(),
    // userId: req.body.userId,
    receipientName: req.body.receipientName,
    weight: req.body.weight,
    destinationTown: req.body.destinationTown,
    destinationCountry: req.body.destinationCountry,
    postcode: req.body.postcode,
    phone: req.body.phone,
    status: 'In transit',
    action: 'Active',
  };
  deliveryOrder.push(order);
  res.status(201).send({
    message: 'Order created',
    parcels: order,
  });
  res.status(400).send({ message: 'Plese try again' });
};

const getAllParcels = (req, res) => {
  res.status(202).json(deliveryOrder);
};

const getOnePercel = (req, res) => {
  const { id } = req.params;
  const parcel = deliveryOrder.find(value => value.id === id);
  if (!parcel) {
    res.status(404).send({ message: 'Not found' });
  }
  res.status(202).send({
    parcel,
  });
};

const updateParcel = (req, res) => {
  const { id } = req.params;

  const parcel = deliveryOrder.find(value => value.id === id);

  if (!parcel) {
    res.status(404).send('Order not found');
  } else {
    // const {receipientName, weight, destinationTown} = req.body;
    // parcel.receipientName = receipientName;
    parcel.receipientName = req.body.receipientName;
    parcel.weight = req.body.weight;
    parcel.destinationTown = req.body.destinationTown;
    parcel.destinationCountry = req.body.destinationCountry;
    parcel.postcode = req.body.postcode;
    parcel.phone = req.body.phone;

    deliveryOrder = deliveryOrder.map((value) => {
      if (value.id === id) {
        return parcel;
      }
      return value;
    });
    res.status(202).send('Parcel updated');
  }
};

const cancelParcel = (req, res) => {
  const { id } = req.params;

  const parcel = deliveryOrder.find(value => value.id === id);

  if (!parcel) {
    res.status(404).send('Parcel no existing');
  } else {
    parcel.action = req.params.action;
    res.status(200).JSON.send({ message: 'Order cancelled' });
  }
};

const changeStatus = (req, res) => {

  const { id } = req.params;

  const order = deliveryOrder.find(value => value.id === id);

  if (!order) {
    res.status(400).send.JSON({ message: 'Order not found' });
  } else {
    order.status = req.params.status;
    res.status(200).send('Status changed');
  }
};

const getParcelByUserId = (req, res) => {

  const { id } = req.params;
  const user = deliveryOrder.find(value => value.id === id);
  if (!user) {
    res.status(404).send({ message: 'Not found' });
  }
  res.status(202).send({
    user,
  });
};

export default {
  createParcel,
  getAllParcels,
  getOnePercel,
  updateParcel,
  cancelParcel,
  changeStatus,
  getParcelByUserId,
};
