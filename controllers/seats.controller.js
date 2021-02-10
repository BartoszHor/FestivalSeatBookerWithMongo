const Seat = require('../models/seats.model');
var sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find());
    } catch(err) {
      res.status(500).json({message: err})
    }
  }

  exports.getSeatById = async (req, res) => {
      try {
          const seat = await Seat.findById({_id: req.params.id})
          if(!seat) res.status(500).json({message: 'Not Found'})
          else res.json(seat)
      } catch(err) {
        res.status(500).json({message: err})
      }
  }

  exports.postNewSeat = async (req, res) => {
    let cleanEmail = sanitize(req.params.email)
    let cleanClient = sanitize(req.params.client)
    const { day, seat } = req.body
      try {
        const newSeat = new Seat( {day: day, seat: seat, client: cleanClient, email: cleanEmail} )
        await newSeat.save()
        res.json({message: 'OK'})
      } catch(err) {
        res.status(500).json({message: err})
      }
  }

  exports.changeSeatData = async (req, res) => {
    const { day, seat, client, email } = req.body
      try {
        await Seat.findOneAndUpdate({_id: req.params.id}, { $set: { day: day, seat: seat, client: client, email: email}}, (a, seat) => {
            if(!seat){
                res.status(404).json({message: 'Not found'})
              } else res.json({message: seat})
            })
      } catch(err) {
        res.status(500).json({message: err})
      }
  }

  exports.deleteSeatData = async (req, res) => {
      try {
        await Seat.findOneAndDelete({_id: req.params.id}, (a, seat) => {
            if(!seat){
                res.status(404).json({message: 'Not found'})
              } else res.json({message: seat})
            })
      } catch(err) {
        res.status(500).json({message: err})
      }
  }