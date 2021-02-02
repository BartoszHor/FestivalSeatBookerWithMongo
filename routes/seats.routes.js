const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller')

router.route('/seats').get(SeatController.getAll)

router.route('/seats/:id').get(SeatController.getSeatById)

router.route('/seats').post(SeatController.postNewSeat)    

router.route('/seats/:id').put(SeatController.changeSeatData)

router.route('/seats/:id').delete(SeatController.deleteSeatData)

module.exports = router;