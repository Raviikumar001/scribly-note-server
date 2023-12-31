const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require('../models/user')
const bcrypt = require('bcryptjs')




router.post("/register", (req, res) => {
 
    User.findOne({ email: req.body.email }, async (err, doc) => {
      if (err) throw err;
      if (doc) {
        return res.status(409).json({message: "User already Exists"})
        // res.send("User Already Exists");
      }
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
        // res.send("User Created");
        return res.status(200).json({message:"User created"})
      }
    });
  });



router.get("/login/success", (req, res) => {

  const userWithoutPassword = req.user
  // console.log(req.user , " lkjl", req.session , " lll", req.cookies)
  // userWithoutPassword.password = undefined
  console.log(userWithoutPassword, "user without password")

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
    // res.redirect("https://scribly-note.netlify.app");
    res.send(200).json({message: "successfully logged out"})
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

// router.get("/google/callback", passport.authenticate("google", {
//     successRedirect: "https://scribly-note.vercel.app/app",
//     failureRedirect: "/login/failed",
// }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
  }),
  (req, res) => {
    console.log(req.user);
    req.session.user = req.user;
    res.redirect("/app")
 
  }
);


module.exports = router;
