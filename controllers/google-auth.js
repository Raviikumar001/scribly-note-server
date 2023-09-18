
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require("../models/user");





passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
        scope: ["profile", "email"]
      },
        function(request,accessToken, refreshToken,profile,done){
            User.findOne({googleId:profile.id}).then((currentUser)=> {
                if(currentUser){
                    console.log('user: '+ currentUser);
                    done(null, currentUser);
                }else{
                  new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    email: profile.emails[0].value,
                }).save().then((newUser) => {
                    console.log('new user created: ', newUser);
                    done(null,newUser)
                });
                }
              })

        }
    )
)


