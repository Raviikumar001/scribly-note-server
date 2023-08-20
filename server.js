const express = require('express');
const connectDB = require('./db/connect');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require("cors");
require('dotenv').config();
require('./controllers/gauth-controller')

//auth routers
const authRoutes = require('./routes/auth-routes')


const app = express();

const port = process.env.PORT || 5000;

//cookie session for 1 dayin milliseconds.
app.use(cookieSession({
    maxAge: 24 * 60 * 60 *1000,
    keys: [process.env.COOKIE_KEY]
  }));

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);



app.use('/auth',authRoutes);

app.get('/',(req,res)=>{
res.send('Welcome to Scribly note')
})

const start = async ()=> {
    try{
        await connectDB(process.env.MONGO_DB_URI);
        app.listen(port, ()=>{
            console.log(`Server is listening on port ${port}...`)
        })
    } catch(error){
        console.log(error);
    }
}

start();
