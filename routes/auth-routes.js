const express = require("express");
const router = express.Router();
const passport = require("passport");


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

router.get("/login", (req, res) => {
    res.logout();
    res.redirect(process.env.CLIENT_URL);
  });

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
