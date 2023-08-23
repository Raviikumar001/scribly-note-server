const express = require("express");
const router = express.Router();
const passport = require("passport");


router.post("/login", (req,res)=>{
  console.log(req.body);
  res.status(200).send('ok')

 })


router.get("/login/success", (req, res) => {
  if (req.user) {
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






 router.post("/register", (req,res)=> {
   console.log(req.body);
   res.status(200).send('ok')

 })

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
