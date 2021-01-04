const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/seats').get((req, res) => {
    res.send(db.seats) 
  })
  
router.route('/seats/:id').get((req, res) => {
      const pickedSeat = db.seats.filter(seat => seat.id == req.params.id)
      res.send(pickedSeat)    
  })
  
router.route('/seats').post((req, res) => {
      const newSeat = {
          id: uuidv4(),
          client: req.body.client,
          seat: req.body.seat,
          email: req.body.email,
      }
      db.seats.push(newSeat)
      res.send({ message: 'OK' })    
  })
  
router.route('/seats/:id').put((req, res) => {
      const id = parseInt(req.params.id)
      const pickedSeat = db.seats.find(seat => seat.id === id)
      const index = db.seats.indexOf(pickedSeat)
  
      db.seats[index] = {
          ...pickedSeat,
          client: req.body.client,
          seat: req.body.seat,
          email: req.body.email,
      }
  
      res.send({ message: 'OK' })    
  })
  
router.route('/seats/:id').delete((req, res) => {
      const id = parseInt(req.params.id)
      const pickedSeat = db.seats.find(seat => seat.id === id)
      const index = db.seats.indexOf(pickedSeat)
  
      db.seats.splice(index, 1)
      res.send({ message: 'OK' })    
  })

module.exports = router;