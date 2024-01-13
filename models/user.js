const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:false,
        trim:true,
        minlength:3,
        maxlength:20,

    },
    email:{
        type:String,
        required:true,
        unique: true,
        trim: true,
        lowercase:true
        
    },
    password:{
        type:String,
        required:false,
        minlength:4,
  

    },
    googleId: {
        type:String,
        required:false
    },

    registrationDate: {
        type:String,
        default:Date.now
    }
})


const User = mongoose.model('User', UserSchema);

module.exports = User;