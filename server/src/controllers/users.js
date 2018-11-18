import uuid from 'uuid';

const registration = [
  {
    id: uuid, f_name: 'nkunzi', lname: 'innocent', email: 'nkunziinnocent@gmail.com', password: 'nkunzi123', status: 'admin',
  },
  {
    id: uuid, f_name: 'kamali', lname: 'yves', email: 'kama@gmail.com', password: 'kama123', status: 'user',
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
    id: uuid,
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.pass,
    status: 'user',
  };

  if (registration.push(user)) {
    res.status(200).send('Seccessfully registered');
  } else {
    res.status(400).send({ message: 'Please try again later'});
  }
};

export default {
  getAllUsers,
  login,
  register,
};
