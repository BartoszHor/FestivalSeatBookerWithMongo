const mongoose = require('mongoose');

const concertSchema = new mongoose.Schema({
  performer: { type: String },
  genre: { type: String },
  day: { type: Number },
  image: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model('Concert', concertSchema);