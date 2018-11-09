const express = require('express');

const router = express.Router();

// RESIGISTRATION ARRAY
const registration = [
  {
    id: 1, f_name: 'nkunzi', lname: 'innocent', email: 'nkunziinnocent@gmail.com', password: 'nkunzi123', status: 'admin',
  },
  {
    id: 2, f_name: 'kamali', lname: 'yves', email: 'kama@gmail.com', password: 'kama123', status: 'user',
  },
];

router.post('/login/:email/:password', (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const email = req.params.email;
  // eslint-disable-next-line prefer-destructuring
  const password = req.params.password;

  for (let i = 0; i < registration.length; i += 1) {
    if (registration[i].email === email && registration[i].password === password && registration[i].status === 'admin') {
      res.send('Welcome Admin');
    // eslint-disable-next-line no-undef
    } else if (registration[i].email === email && registration[i].password === password && registration[i].status === 'user') {
      res.send('Welcome costomer');
    }
  }
});

router.use('/register', (req, res) => {
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

// GET ALL RESISTERED USERS

router.get('/api/v1/users', (req, res) => {
  res.send(registration);
});

module.exports = router;
