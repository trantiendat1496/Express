const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({

    image:{
      type : String,
      default: 'uploads/6d127881bd16903eb8d99e0257ca2157'
    },
    title:{
      type : String,
      required: 'This field is required.'
    },  
    author: {
      type : String,
      required: 'This field is required.'
    },
    description: {
      type : String,
      required: 'This field is required.'
    },
    price: {
      type : Number,
      required: true
    }
    
  });

  const Book = mongoose.model('Book', bookSchema, 'books');


  module.exports = Book;
