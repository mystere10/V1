
const express = require('express');

const usersRoutes = require('./usersRoutes');

//const orderRoutes = require('./orderRoutes');

// Init app
const app = express();

app.use(express.json());

app.use('/api/v1/users', usersRoutes);

app.use('/api/v1/parcels', orderRoutes);

// PORT ASSIGNATION
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
