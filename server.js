const express = require('express');
const connectDB = require('./db/connect');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require("cors");
const bcrypt= require('bcryptjs');
const bodyParser= require('body-parser')
const passportLocal = require("passport-local").Strategy;

require('dotenv').config();


//another packages solution for simple auth

const cookieParser = require('cookie-parser')
const session = require("express-session");
const User = require('./models/user');

const authRoutes = require('./routes/auth-routes')

//


//auth routers


const app = express();

const port = process.env.PORT || 5000;

//cookie session for 1 dayin milliseconds.




// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 *1000,
//     keys: [process.env.COOKIE_KEY]
//   }));
 
//middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//another solution
app.use(
    session({
      secret: "secretcode",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(cookieParser("secretcode"));

  //initialize passport
app.use(passport.initialize())
app.use(passport.session())
require('./controllers/gauth-controller')

// passport local code


passport.use(new passportLocal({
  usernameField:"email",
  passwordField: "password"
},
  function(email,password,done) {
      console.log(email, password)
      User.findOne({email:email},async function (err,user){
          console.log(user.email)
          if(err) { 
              return done(err);
          }
          if(!user){
              return done(null, false, {message: "Incorrect username. "});
          }
          if(await bcrypt.hash(password,user.password) ){
              user.password=undefined;
              return done (null,user);
          }
          
          return done(null,false, {message: "Incorrect password"})
          
      })
  }
))

passport.serializeUser( (user, done)=> {
  if(user){
      return done(null,user.id)
  }
  else {
      return done(null, false)
  }
} );
passport.deserializeUser((id, done)=>{
  User.findById(id, (err,user)=> {
      if(err) return done(null,false);
      return done(null, user)
  })
});


app.post('/login', passport.authenticate('local'),
function(req,res){
    res.send(req.user)
    
} );
//
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
