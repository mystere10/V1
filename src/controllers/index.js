const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('WELCOME TO SendIT');
});

export default router;
