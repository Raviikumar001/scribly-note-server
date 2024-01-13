const express = require('express');
const router  = express.Router();
const passport = require('passport');
const {register, login} = require('../controllers/auth-controller');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const client = process.env.CLIENT;


router.route('/register').post(register);
router.route('/login').post(login);

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


  router.get(
    "/google/callback",
    passport.authenticate("google", {

      failureRedirect: "/login/failed",
      session:false,
    }),
    (req,res)=> {
        const token = jwt.sign({userid:req.user._id}, process.env.SECRET_KEY,{
            expiresIn:'1d'
          })
        res.redirect(`${client}/app?user=${JSON.stringify(req.user)}&token=${token}`);
    }
   
  );
  



module.exports = router;





