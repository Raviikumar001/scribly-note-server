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
    
    
  },
body: {
    type:String,
    unique:false,
    required:false
},
lastModified: {
    type:Date,
    required:false,
    default:Date.now
},
dateCreated:{
    type:Date,
    required:false,
    default: Date.now
}

});

const Notes = mongoose.model('Notes', noteSchema);
module.exports = Notes;
