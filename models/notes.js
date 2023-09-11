const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const noteSchema = new mongoose.Schema({
   creator:{
    type:Schema.Types.ObjectId,
    ref:'User',
   },

    title: {
    type: String,
    required: false,
    unique:false,
    // minlength:3,
    maxlength:200
  },
body: {
    type:String,
    unique:false,
    required:false
},
lastModified: {
    type:String,
    required:false,
    default:Date.now
},
dateCreated:{
    type:String,
    required:false,
    default: Date.now
}

});

const Notes = mongoose.model('Notes', noteSchema);
module.exports = Notes;
