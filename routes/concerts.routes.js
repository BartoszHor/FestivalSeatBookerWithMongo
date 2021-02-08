const express = require('express');
const router = express.Router();
const ConcertController = require('../controllers/concerts.controller')

router.route('/concerts').get(ConcertController.getAll)

router.route('/concerts/performer/:performer').get(ConcertController.getConcertsOfPerformer)

router.route('/concerts/genre/:genre').get(ConcertController.getConcertsByGenre)

router.route('/concerts/day/:day').get(ConcertController.getConcertsByDay)

router.route('/concerts/price/:price_min/:price_max').get(ConcertController.getConcertsByPrice)

router.route('/concerts/:id').get(ConcertController.getConcertById)

router.route('/concerts').post(ConcertController.postNewConcert)    

router.route('/concerts/:id').put(ConcertController.changeConcertData)

router.route('/concerts/:id').delete(ConcertController.deleteConcertData)


module.exports = router;