const express = require("express");
const router = express.Router();
const Usr = require("../../models/Client");
const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["openid", "email", "profile"] })
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.json({ success: "G Auth" });
//   }
// );

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email"]
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect home.

    const payload = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };
    //Sign Token
    jwt.sign(payload, keys.secretKey, { expiresIn: 604800 }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token
      });
    });
  }
);

module.exports = router;
