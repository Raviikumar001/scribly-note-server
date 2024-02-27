const passport   = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;;
const User= require('../models/user');
 




passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://scribly-note-server-production.up.railway.app/v1/auth/google/callback",
    scope: ["profile", "email"]
  },
  function(accessToken, refreshToken, profile,done) {
   
    //  check if user exists
    User.findOne({googleId:profile.id}).then((currentUser)=> {
      if(currentUser){
          console.log('user: '+ currentUser);
          done(null, currentUser);
      }else{
        new User({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
      }).save().then((newUser) => {
          console.log('new user created: ', newUser);
          done(null,newUser)
      });
      }
    })

    
    
  }
));

