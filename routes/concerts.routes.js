const express = require('express');
const router = express.Router();
const db = require('./../db');

router.route('/concerts').get((req, res) => {
res.send(db.concerts) 
})

router.route('/concerts/:id').get((req, res) => {
    const pickedConcert = db.concerts.filter(concert => concert.id == req.params.id)
    res.send(pickedConcert)    
})

router.route('/concerts').post((req, res) => {
    const newConcert = {
        id: uuidv4(),
        performer: req.body.performer,
        genre: req.body.genre,
    }
    db.concerts.push(newConcert)
    res.send({ message: 'OK' })    
})

router.route('/concerts/:id').put((req, res) => {
    const id = parseInt(req.params.id)
    const pickedConcert = db.concerts.find(concert => concert.id === id)
    const index = db.concerts.indexOf(pickedConcert)

    db.concerts[index] = {
        ...pickedConcert,
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
    }

    res.send({ message: 'OK' })    
})

router.route('/concerts/:id').delete((req, res) => {
    const id = parseInt(req.params.id)
    const pickedConcert = db.concerts.find(concert => concert.id === id)
    const index = db.concerts.indexOf(pickedConcert)

    db.concerts.splice(index, 1)
    res.send({ message: 'OK' })    
})

module.exports = router;