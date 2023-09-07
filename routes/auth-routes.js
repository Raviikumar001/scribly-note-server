const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require('../models/user')
const bcrypt = require('bcryptjs')



router.post("/register", (req, res) => {
  console.log(req.body.email, req.body.username) 
    User.findOne({ email: req.body.email }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
        const newUser = new User({
          username: req.body.username,
          email:req.body.email,
          password: hashedPassword,
          registrationDate: req.body.registrationDate
  
        });
        await newUser.save();
        console.log(newUser)
        res.send("User Created");
      }
    });
  });



router.get("/login/success", (req, res) => {
  console.log(req.user, "req user in auth route")
  const userWithoutPassword = {...req.user}
  userWithoutPassword.password = undefined
  if (req.user )  {
    res
      .status(200)
      .json({
        error: false,
        message: "Success fully logged in",
        user: userWithoutPassword,
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






 

 

//  router.get('/user',(req, res)=> {
//    res.send('ok')
//  })


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
