const Testimonial = require('../models/testimonials.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Testimonial.find());
    } catch(err) {
      res.status(500).json({message: err})
    }
  }

  exports.getTestimonialById = async (req, res) => {
      try {
          const testimonial = await Testimonial.findById({_id: req.params.id})
          if(!testimonial) res.status(500).json({message: 'Not Found'})
          else res.json(testimonial)
      } catch(err) {
        res.status(500).json({message: err})
      }
  }

  exports.postNewTestimonial = async (req, res) => {
    const { author, text } = req.body
      try {
        const newTestimonial = new Testimonial( {author: author, text: text} )
        await newTestimonial.save()
        res.json({message: 'OK'})
      } catch(err) {
        res.status(500).json({message: err})
      }
  }

  exports.changeTestimonialData = async (req, res) => {
    const { author, text } = req.body
      try {
        await Testimonial.findOneAndUpdate({_id: req.params.id}, { $set: { author: author, text: text }}, (a, testimonial) => {
            if(!testimonial){
                res.status(404).json({message: 'Not found'})
              } else res.json({message: testimonial})
            })
      } catch(err) {
        res.status(500).json({message: err})
      }
  }

  exports.deleteTestimonialData = async (req, res) => {
      try {
        await Testimonial.findOneAndDelete({_id: req.params.id}, (a, testimonial) => {
            if(!testimonial){
                res.status(404).json({message: 'Not found'})
              } else res.json({message: testimonial})
            })
      } catch(err) {
        res.status(500).json({message: err})
      }
  }

  exports.getRandom = async (req, res) => {
    try {
  
      const testimonial = await Testimonial.findOne().skip(Math.floor(Math.random() * await Testimonial.countDocuments()))
      if(!testimonial) res.status(404).json({message: 'Not found'})
      else res.json(testimonial)
    } catch(err) {
      res.status(500).json({message: err})
    }
  
  }