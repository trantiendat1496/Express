const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    
    name: String,
    image: String,
    description: String,
    price: String
  });

  const Book = mongoose.model('Book', bookSchema, 'books');


  module.exports = Book;
