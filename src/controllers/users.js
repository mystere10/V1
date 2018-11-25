import uuid from 'uuid/v1';

import parcelsRouter from '../routes/parcels';

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

  if (email === '' || null) {
    res.status(403).send('Please enter your email');
  }

  if (email.indexOf('@', 0) < 0) {
    res.status(403).send('Please fill a valid email');
  }

  if (email.indexOf('.', 0) < 0) {
    res.status(403).send('Please fill a valid email');
  }

  if (password === '' || password === null) {
    res.status(403).send('Please fill out your password');
  }

  if (password.length < 6) {
    res.status(403).send('Plese the password need to be at least 6 charachers');
  } else {
    registration.forEach((key) => {
      if (key.email === email && key.password === password && key.status === 'admin') {
        res.send('Welcome Admin');
      } else if (key.email === email && key.password === password && key.status === 'user') {
        res.send('Welcome costomer');
      }
    });
  }
};

const register = (req, res) => {
  const {
    fname, lname, email, password,
  } = req.body;

  if (fname === '' || fname === null) {
    res.status(403).send('Please enter your First name');
  }

  if (fname.length < 3) {
    res.status(403).send('The name should be at least 3 characters');
  }

  if (lname === '' || fname === null) {
    res.status(403).send('Please enter your last name');
  }

  if (lname.length < 3) {
    res.status(403).send('The name should be at least 3 characters');
  }

  if (email === '' || null) {
    res.status(403).send('Please enter your email');
  }

  if (email.indexOf('@', 0) < 0) {
    res.status(403).send('Please fill a valid email');
  }

  if (email.indexOf('.', 0) < 0) {
    res.status(403).send('Please fill a valid email');
  }

  if (password === '' || password === null) {
    res.status(403).send('Please fill out your password');
  }

  if (password.length < 6) {
    res.status(403).send('Plese the password need to be at least 6 charachers');
  }

  const user = {
    id: uuid(),
    fname,
    lname,
    email,
    password,
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
  res.status(202).send({
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
