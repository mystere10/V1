
const express = require('express');

const usersRoutes = require('./usersRoutes');


// Init app
const app = express();

app.use(express.json());

app.use('/api/v1/users', usersRoutes);


// PORT ASSIGNATION
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
