const express = require('express');
const jwt = require('jsonwebtoken');

const bodyParser = require('body-parser')
const cors = require('cors');

require('dotenv').config();
const connectDB = require('./db/connect');
const passport = require('passport')

require('./controllers/google-auth');
const authRoutes = require("./routes/authroutes");
const cookieParser = require('cookie-parser');
//

const app = express();

const port = process.env.PORT || 5000

//middleware
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use(cors({
//   origin:"http://localhost:5173",
//   methods: "GET,POST,PUT,DELETE,PATCH",
//   credentials: true,
//   allowedHeaders:"Content-Type,Authorization"
//   })
//   );

const corsOptions = {
    origin: true,
    credentials: true,
  };

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST","DELETE","PATCH");
    
   
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

app.use(cors(corsOptions));
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




