const express = require('express')
const router = express.Router();
const passport = require("passport");
router.get('/login', (req,res)=>{
    res.send('login');
})

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
  );


router.get("/google/callback", passport.authenticate("google"), (req,res)=> {
    res.send('ok')
})


module.exports = router;