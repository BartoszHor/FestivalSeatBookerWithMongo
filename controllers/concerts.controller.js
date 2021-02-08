const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Concert.find());
    } catch(err) {
      res.status(500).json({message: err})
    }
  }

  exports.getConcertsOfPerformer = async (req, res) => {
    try {
        const concerts = await Concert.find({performer: req.params.performer})
        if(!concerts) res.status(500).json({message: 'Not Found'})
        else res.json(concerts)
    } catch(err) {
      res.status(500).json({message: err})
    }
}

  exports.getConcertsByGenre = async (req, res) => {
    try {
        const concerts = await Concert.find({genre: req.params.genre})
        if(!concerts) res.status(500).json({message: 'Not Found'})
        else res.json(concerts)
    } catch(err) {
      res.status(500).json({message: err})
    }
  }

  exports.getConcertsByPrice = async (req, res) => {
    try {
        const concerts = await Concert.find({ $and: [{ price: { $gte: req.params.price_min }}, { price: { $lte: req.params.price_max }}] })
        if(!concerts) res.status(404).json({message: 'Not Found'})
        else res.json(concerts)
    } catch(err) {
      res.status(500).json({message: err})
    }
}

  exports.getConcertsByDay = async (req, res) => {
    try {
        const concerts = await Concert.find({ day: req.params.day})
        if(!concerts) res.status(500).json({message: 'Not Found'})
        else res.json(concerts)
    } catch(err) {
      res.status(500).json({message: err})
    }
  }

  exports.getConcertById = async (req, res) => {
      try {
          const concert = await Concert.findById({_id: req.params.id})
          if(!concert) res.status(500).json({message: 'Not Found'})
          else res.json(concert)
      } catch(err) {
        res.status(500).json({message: err})
      }
  }

  exports.postNewConcert = async (req, res) => {
    const { performer, day, image, price, genre } = req.body
      try {
        const newConcert = new Concert( {performer: performer, day: day, image: image, price: price, genre: genre} )
        await newConcert.save()
        res.json({message: 'OK'})
      } catch(err) {
        res.status(500).json({message: err})
      }
  }

  exports.changeConcertData = async (req, res) => {
    const { performer, day, image, price, genre } = req.body
      try {
        await Concert.findOneAndUpdate({_id: req.params.id}, { $set: {performer: performer, day: day, image: image, price: price, genre: genre}}, (a, concert) => {
            if(!concert){
                res.status(404).json({message: 'Not found'})
              } else res.json({message: concert})
            })
      } catch(err) {
        res.status(500).json({message: err})
      }
  }

  exports.deleteConcertData = async (req, res) => {
      try {
        await Concert.findOneAndDelete({_id: req.params.id}, (a, concert) => {
            if(!concert){
                res.status(404).json({message: 'Not found'})
              } else res.json({message: concert})
            })
      } catch(err) {
        res.status(500).json({message: err})
      }
  }