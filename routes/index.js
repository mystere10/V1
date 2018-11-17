
import home from './Controllers/index';
import userspage from './Controllers/users';
// import parcelspage from './Controllers/parcels';

export default (app) => {
  app.use('/api/v1/', home);
  app.use('/api/v1/user', userspage);
// app.use('/api/v1/parcels', parcelspage);
};
