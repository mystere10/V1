import express from 'express';

import controllers from '../controllers/users';

const router = express.Router();

router.get('/', controllers.getAllUsers);

router.get('/:id', controllers.getUserById);

// router.get('/:id/:parcelid', controllers.getParcelsById);

router.post('/:email/:password', controllers.login);

router.post('/', controllers.register);

export default router;
