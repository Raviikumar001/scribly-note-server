const mongoose = require('mongoose');

const connectDB = (url)=>
{
    return mongoose.connect(url,{
        dbName:'auth-test'
    });
}

module.exports = connectDB;
