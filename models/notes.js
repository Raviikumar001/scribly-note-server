const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('../models/user');

const noteSchema = new mongoose.Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: User,
    },

    title: {
        type: String,
        required: false,
        unique: false,


    },
    body: {
        type: String,
        unique: false,
        required: false
    },
    lastModified: {
        type: String,
        required: false,
        default: Date.now
    },
    dateCreated: {
        type: String,
        required: false,
        default: Date.now
    }

});

const Notes = mongoose.model('Notes', noteSchema);
module.exports = Notes;
