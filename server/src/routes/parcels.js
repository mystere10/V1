import express from 'express';

import controllers from '../controllers/parcels';

const router = express.Router();

router.post('/', controllers.createParcel);

// router.get('/', controllers.getAllParcels);

// // router.get('/', controllers.getParcelByUserId);

// router.get('/:id', controllers.getOnePercel);

<<<<<<< HEAD
// router.put('/:id', controllers.updateParcel);
=======
router.put('/:id', controllers.cancelParcel);
>>>>>>> ch-tesing-#162149970

// router.delete('/:id', controllers.deleteParcel);

// router.put('/status/:id', controllers.changeStatus);


export default router;
