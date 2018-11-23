import express from 'express';

// import homepage from './routes/index';

import parcels from './routes/parcels';

import users from './routes/users';

// Init app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use('/api/v1/', homepage);

app.use('/api/v1/parcels', parcels);

app.use('/api/v1/users', users);


// PORT ASSIGNATION
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
