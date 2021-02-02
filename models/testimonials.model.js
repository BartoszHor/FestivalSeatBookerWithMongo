const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  author: { type: String },
  text: { type: String },
});

module.exports = mongoose.model('Testimonial', testimonialSchema);