const mongoose = require('mongoose');


const sessionSchema = new mongoose.Schema({
    
    cart: Object
  });

  const Session = mongoose.model('Session', sessionSchema, 'sessions');


  module.exports = Session;
