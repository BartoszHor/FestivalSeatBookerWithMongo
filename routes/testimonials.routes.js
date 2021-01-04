const express = require('express');
const router = express.Router();
const db = require('./../db');


router.route('/testimonials/random').get((req, res) => {
    const randomBook = db.testimonials[Math.floor((Math.random()*db.testimonials.length))]
    res.json(randomBook)    
})

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials) 
})

router.route('/testimonials/:id').get((req, res) => {
    const pickedBook = db.testimonials.filter(book => book.id == req.params.id)
    res.json(pickedBook)    
})

router.route('/testimonials').post((req, res) => {
    const newBook = {
        id: uuidv4(),
        author: req.body.author,
        text: req.body.text,
    }
    db.testimonials.push(newBook)
    res.json({ message: 'OK' })    
})

router.route('/testimonials/:id').put((req, res) => {
    const id = parseInt(req.params.id)
    const pickedBook = db.testimonials.find(book => book.id === id)
    const index = db.testimonials.indexOf(pickedBook)

    db.testimonials[index] = {
        ...pickedBook,
        author: req.body.author,
        text: req.body.text
    }

    res.json({ message: 'OK' })    
})

router.route('/testimonials/:id').delete((req, res) => {
    const id = parseInt(req.params.id)
    const pickedBook = db.testimonials.find(book => book.id === id)
    const index = db.testimonials.indexOf(pickedBook)

    db.testimonials.splice(index, 1)
    res.json({ message: 'OK' })    
})


module.exports = router;