const mongoose = require('mongoose');


const sessionSchema = new mongoose.Schema({
    _id : String,
    cart: Array,
    totalQuantity: Number,
    totalPrice: Number,
    userId: String
  });

  const Session = mongoose.model('Session', sessionSchema, 'sessions');


  module.exports = Session;
