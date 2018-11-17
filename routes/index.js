
const home = require('./Controllers/index');

const users = require('./Controllers/users');
// import parcelspage from './Controllers/parcels';

export default (app) => {
  app.use('/api/v1/', home);
  app.use('/api/v1/user', users);
// app.use('/api/v1/parcels', parcelspage);
};
