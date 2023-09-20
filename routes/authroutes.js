const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
require('../controllers/google-auth.js');
require('../controllers/localAuth.js');



router.post("/register", async(req, res) => {
 
  try {
    const existingUser = await User.findOne({ email: req.body.email });
  
    if (existingUser) {
      return res.status(409).json({ message: "User already Exists" });
    }
  
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      registrationDate: req.body.registrationDate,
    });
  
    await newUser.save();
    console.log(newUser);
    return res.status(200).json({ message: "User created" });
  } catch (err) {
    // Handle errors here
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


const cheackUser= async(req, res ,next)=>
{
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });
 
  if(!user)
  {
   return  res.status(404).json({message: "User does not exist"})
  }
  const isPasswordCorrect = await bcrypt.compare(password,user.password)
  if (!isPasswordCorrect) {
    return res.status(401).json({message: "Passwored is incorrect"})
  }

  next()
}



router.post('/login',cheackUser, passport.authenticate('local', {session:false}),
function(req,res){
  const user = req.user
  const token = jwt.sign({user:{"email": req.user.email}, id:req.user._id}, process.env.ACCESS_SECRET);
  console.log(token);
  

res.status(200).json({ message: 'Authentication successful', user, token});
} );


router.get("/login/failed", (req, res) => {
  
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);


router.get('/google/callback', 
	passport.authenticate("google", {
   
		failureRedirect: "/auth/login/failed",
		session:false
	}),
  function(req,res) {

    console.log(req.user, "new user");  
    const user = JSON.stringify(req.user);
    const token = jwt.sign({id:req.user._id}, process.env.ACCESS_SECRET);
    console.log(token);
    
    res.redirect(`${process.env.CLIENT_URL}/app/Oauth/?token=${token}&user=${user}`);


  }

	)


module.exports = router