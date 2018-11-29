import express from 'express';
import dotenv from 'dotenv';
import db from './db/connect';

import homepage from './routes/index';

import parcels from './routes/parcels';

import users from './routes/users';


dotenv.config();

db.connect()
  .then(() => console.log('Postgress connected'));

// Init app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/', homepage);

app.use('/api/v1/auth', users);

app.use('/api/v1/parcels', parcels);

app.use('/api/v1/users', users);

// app.use('/api/v1/auth', auth);


// PORT ASSIGNATION
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
