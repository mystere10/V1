import uuid from 'uuid/v1';

import parcelsRouter from '../routes/parcels';

import router from '../routes/users';

const registration = [
  {
    id: '8cd981b0-eb3c-11e8-9db2-25ea4fd7f1bu', f_name: 'nkunzi', lname: 'innocent', email: 'nkunziinnocent@gmail.com', password: 'nkunzi123', status: 'admin',
  },
  {
    id: '8cdu31b0-eb3c-11e8-9db2-25ea4fd7f1bf', f_name: 'kamali', lname: 'yves', email: 'kama@gmail.com', password: 'kama123', status: 'user',
  },
];

const getAllUsers = (req, res) => {
  res.status(202).send(registration);
};

const login = (req, res) => {
  const { email } = req.params;
  const { password } = req.params;

  for (let i = 0; i < registration.length; i += 1) {
    if (registration[i].email === email && registration[i].password === password && registration[i].status === 'admin') {
      res.send('Welcome Admin');
    } else if (registration[i].email === email && registration[i].password === password && registration[i].status === 'user') {
      res.send('Welcome costomer');
    }
  }
};

const register = (req, res) => {
  const user = {
    id: uuid(),
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.pass,
    status: 'user',
  };

  if (registration.push(user)) {
    res.status(201).send({
      users: registration.pop(),
      message: 'Successfully registered',
    });
  } else {
    res.status(400).send({ message: 'Please try again later' });
  }
};

const getUserById = (req, res) => {

  const { id } = req.params;
  const user = registration.find(value => value.id === id);
  if (!user) {
    res.status(404).send({ message: 'Not found' });
  }
  res.status(200).send({
    user,
  });
};


export default {
  getAllUsers,
  login,
  register,
  getUserById,
  registration,
};
