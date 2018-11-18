import uuid from 'uuid/v1';

let deliveryOrder = [

  {
    id: '8cd981b0-eb3c-11e8-9db2-25ea4fd7f1bf',
    receipient_name: 'Peace',
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
    receipient_name: req.body.receipient,
    weight: req.body.weight,
    destinationTown: req.body.destinationTown,
    destinationCountry: req.body.destinationCountry,
    postcode: req.body.postcode,
    phone: req.body.phone,
    status: 'In transit',
  };
  if (deliveryOrder.push(order)) {
    res.status(200).send({
      status: 200,
      parcels: [],
    });
  } else {
    res.status(400).send({ message: 'Plese try again' });
  }
};

const getAllParcels = (req, res) => {
  res.status(200).json(deliveryOrder);
};

const getOnePercel = (req, res) => {
  const { id } = req.params;

  const parcel = deliveryOrder.find(value => value.id === id);
  if (!parcel) {
    res.status(404).send({ message: 'Not found' });
  }
  res.status(200).send({
    parcel,
  });
};

const updateParcel = (req, res) => {
  const { id } = req.params;

  const parcel = deliveryOrder.find(value => value.id === id);

  if (!parcel) {
    res.status(404).send('Order not found');
  } else {
    parcel.receipient_name = req.body.receipient_name;
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

const deleteParcel = (req, res) => {
  const { id } = req.params;

  const parcel = deliveryOrder.find(value => value.id === id);

  if (!parcel) {
    res.status(404).send('Parcel no existing');
  } else {
    const index = deliveryOrder.indexOf(parcel);

    deliveryOrder.splice(index, 1);

    res.status(200).send('Order deleted');
  }
};

const changeStatus = (req, res) => {

  const { id } = req.params;

  const order = deliveryOrder.find(value => value.id === id, 10);

  if (!order) {
    res.status(400).send({ message: 'Order not found' });
  } else {
    order.status = req.params.status;
    res.status(200).send('Status changed');
  }
};

export default {
  createParcel,
  getAllParcels,
  getOnePercel,
  updateParcel,
  deleteParcel,
  changeStatus,
};
