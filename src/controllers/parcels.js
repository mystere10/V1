import uuid from 'uuid/v1';

let deliveryOrder = [

];


const createParcel = (req, res) => {
  const order = {
    id: uuid(),
    receipientName: req.body.receipientName,
    weight: req.body.weight,
    destinationTown: req.body.destinationTown,
    destinationCountry: req.body.destinationCountry,
    postcode: req.body.postcode,
    phone: req.body.phone,
    status: 'In transit',
    action: 'Active',
  };
  if (deliveryOrder.push(order)) {
    res.status(200).send({
      message: 'Order created',
      parcels: [deliveryOrder],
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
    res.status(200).JSON.send({ message: 'Order canceled' });
  }
};

const changeStatus = (req, res) => {

  const { id } = req.params;

  const order = deliveryOrder.find(value => value.id === id, 10);

  if (!order) {
    res.status(400).send.JSON({ message: 'Order not found' });
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
  cancelParcel,
  changeStatus,
};
