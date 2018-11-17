import express from 'express';

import path from 'path';

// Init app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// PORT ASSIGNATION
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
