const mongoose = require('mongoose');

const connectDB = (url)=>
{
    return mongoose.connect(url,{
        dbName:'scribly-note'
    });
}

module.exports = connectDB;

