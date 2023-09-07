const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  email:{
     type:String,
     required:true,
     unique:true,
     trim:true,
     lowercase:true,
    //  match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
     
  },
  password: {
    type:String,
    required:false,
    minlength:8,
  },
  googleId: {
    type: String,
    required:false
  },

  registrationDate: {
    type: String,
    default:Date.now
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
