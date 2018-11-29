import express from 'express';

import { puts } from 'util';

import auth from '../controllers/auth';

import controllers from '../controllers/users';


const router = express.Router();

router.get('/', controllers.getAllUsers);

router.get('/:id', controllers.getUserById);

router.get('/:id/parcels', controllers.getParcelByUserId);

router.post('/signin', auth.login);

router.post('/signup', auth.register);

// router.get('/signout', controllers.userSignout);

router.delete('/', controllers.deleteAllUsers);

export default router;
