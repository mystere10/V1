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
  const {
    userId, receipientName, weight, destinationTown, destinationCountry, postcode, phone,
  } = req.body;

  if (!userId || userId === '' || userId === null) {
    res.status(403).send('Plese the password need to be at least 6 charachers');
  }
  if (receipientName < 3) {
    res.status(403).send('Plese the password need to be at least 6 charachers');
  }

  if (weight === '' || weight === null) {
    res.status(403).send('Plese enter the weight of your parcel');
  }

  if (typeof (weight) !== 'number') {
    res.status(403).send('Please enter only numbers');
  }

  if (destinationTown === '' || destinationTown === null) {
    res.status(403).send('Plese enter the destination town');
  }

  if (destinationCountry === '' || destinationCountry === null) {
    res.status(403).send('Plese enter the destination country');
  }

  if (postcode === '' || postcode === null) {
    res.status(403).send('Plese enter the destination postcode');
  }

  if (phone === '' || phone === null) {
    res.status(403).send('Plese enter the destination postcode');
  }

  const order = {
    id: uuid(),
    userId,
    receipientName,
    weight,
    destinationTown,
    destinationCountry,
    postcode,
    phone,
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
    const {
      receipientName,
      weight,
      destinationTown,
      destinationCountry,
      postcode,
      phone,
    } = req.body;
    parcel.receipientName = receipientName;
    parcel.weight = weight;
    parcel.destinationTown = destinationTown;
    parcel.destinationCountry = destinationCountry;
    parcel.postcode = postcode;
    parcel.phone = phone;

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
