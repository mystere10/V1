import express from 'express';

import controllers from '../controllers/parcels';

const router = express.Router();

router.post('/', controllers.createParcel);

router.get('/', controllers.getAllParcels);

router.get('/:id', controllers.getOnePercel);

router.put('/:id', controllers.updateParcel);

router.delete('/:id', controllers.deleteParcel);

router.put('/status/:id', controllers.changeStatus);


export default router;
