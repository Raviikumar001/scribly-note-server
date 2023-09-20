const passportLocal = require("passport-local").Strategy;
const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


passport.use(new passportLocal({
    usernameField:"email",
    passwordField: "password",
    session: false
    
    },      
   async function(email,password,done) {
       
        try {
            const user = await User.findOne({ email: email });
          
           
          
            user.password = undefined;
            return done(null, user);
          } catch (error) {
            return done(error);
          }
    }
    ))