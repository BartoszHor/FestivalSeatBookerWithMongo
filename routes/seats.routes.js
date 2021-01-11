const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
    res.send(db.seats) 
  })
  
router.route('/seats/:id').get((req, res) => {
      const pickedSeat = db.seats.find(seat => seat.id == req.params.id)
      res.send(pickedSeat)    
  })
  
router.route('/seats').post((req, res) => {

  const {day, seat, client, email} = req.body;
  const id = new Date().getUTCMilliseconds();
  const seatValidation = db.seats.some(booking => booking.day === day && booking.seat === seat);
  if(!seatValidation) {
      db.seats.push({
          id: id,
          day: day,
          seat: seat,
          client: client,
          email: email,
      });
      res.send({ message: 'OK' });
  } else {
      res.status(409).json({message: "The slot is already taken..."});
  }
});
  
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