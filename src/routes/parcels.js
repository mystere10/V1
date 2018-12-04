import express from 'express';

import controllers from '../controllers/parcels';

import auth from '../helpers/auth';

const router = express.Router();

router.post('/', controllers.createParcel);

router.get('/', controllers.getAllParcels);

router.get('/:id', controllers.getOneParcel);

router.put('/status/:id', auth, controllers.changeStatus);

router.put('/:id/prelocation', auth, controllers.preLocation);

router.put('/:id/destination', auth, controllers.changeDestination);

// router.delete('/', controllers.deleteAllparcels);

// router.put('/:id/presentLocation, controllers.changePresntLoacation');

export default router;
