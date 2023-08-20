const express = require('express')
const router = express.Router();
const passport = require("passport");
router.get('/login', (req,res)=>{
    res.send('login');
})

router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile"],
    })
  );



module.exports = router;