const mongoose = require('mongoose');
const BookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedDate: Date,
  genres: String,
  price:{
    type:Number,
    min:[0,"Price must be positive integer"],
  }
});

module.exports = mongoose.model('Book', BookSchema);