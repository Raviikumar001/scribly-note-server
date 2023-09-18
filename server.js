const express = require('express');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser')
const cors = require('cors');

require('dotenv').config();
const connectDB = require('./db/connect');
const passport = require('passport')

require('./controllers/google-auth');
const authRoutes = require("./routes/authroutes");
//

const app = express();

const port = process.env.PORT || 5000

//middleware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({
  origin:"http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH",
  credentials: true,
  allowedHeaders:"Content-Type,Authorization"
  })
  );

//routes
app.use(passport.initialize());

app.use("/auth", authRoutes);



app.get("/", (req,res)=>{

    res.send("Welcome to Scribly Note")
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
