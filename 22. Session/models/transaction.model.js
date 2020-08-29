const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    
    userId: String ,
    bookId: String,

    userName: String,
    bookName: String,
    bookImage: String,
    bookIDescription: String,
    bookPrice: String

  });

  const Transaction = mongoose.model('Transaction', transactionSchema, 'transactions');


  module.exports = Transaction;
