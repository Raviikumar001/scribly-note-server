const mongoose = require('mongoose');

const connectDB = (url)=>
{
    return mongoose.connect(url,{
        dbName:'Scribly-noteDb'
    });
}

module.exports = connectDB;
