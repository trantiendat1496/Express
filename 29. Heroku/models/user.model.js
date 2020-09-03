const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    
    name:{
      type : String,
      required: 'This field is required.'
    },
    phone:{
      type : String,
      required: 'This field is required.'
    },
    email:{
      type : String,
      required: 'This field is required.'
    },
    password:{
      type : String,
      required: 'This field is required.'
    },
    avatar:{
      type : String,
      default: 'uploads/6d127881bd16903eb8d99e0257ca2157'
    }

  });



  const User = mongoose.model('User', userSchema, 'users');


  module.exports = User;
