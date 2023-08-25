const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const { Login, Register }= require('../controllers/auth-router')


 router.route('/login').post(Login);
 router.route('/register').post(Register);


router.get("/login/success", (req, res) => {
  console.log(req.user, "req user in auth route")
   console.log(req.cookies)
  if (req.user || req.session.user)  {
    res
      .status(200)
      .json({
        error: false,
        message: "Success fully logged in",
        user: req.user,
      });
  } else {
    res.status(403).json({ error: true, message: "Not Authorised" });
  } 
  
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});


router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
  });






//  router.post("/register", async (req,res)=> {
//   console.log(req.body.username)
//   try {
//     const currentUser = await User.findOne({ email: req.body.email });

//     if(currentUser)
//      {
//        res.send("user already Exists");
//      }  else {
//       const hashedPassword = await bcrypt.hash(req.body.password,10)
//       console.log(hashedPassword)
//       const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password: hashedPassword
//       });
//       newUser.save();
//       console.log(newUser)
//       res.send("User Created",);

//     }
//   } catch (error){
//     console.error(error);
//   }})

    
   
  //  async(err, doc)=> {
  //   if(err) throw  err;
  //   if (doc) res.send('User already Exists');
  //   if(!doc){
  //     const newUser = new User({
  //       username: req.body.username,
  //       email: req.body.email,
  //       password: req.body.password
  //     });
  //     await newUser.save();
  //     console.log(newUser)
  //     res.send("User Created");
  //   }
  //  }
 

 

 router.get('/user',(req, res)=> {
   res.send('ok')
 })


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
}));

module.exports = router;
