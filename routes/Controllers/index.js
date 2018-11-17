import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('WELCOME TO SendIT');
});

module.exports = router;
