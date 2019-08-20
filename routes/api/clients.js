const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Clients = require("../../models/Client");
const keys = require("../../config/keys");

const passport = require("passport");

// @route POST api/users/register
// Register Users

router.post("/register", (req, res) => {
  Clients.findOneAndUpdate(
    { oid: req.body.oid },
    { picture: req.body.picture },
    { new: true }
  ).then(client => {
    if (req.body.mykey != "hello") {
      return res.status(400).json({ error: "key not match" });
    }

    if (client) {
      const payload = {
        oid: client.oid,
        name: client.name,
        email: client.email,
        picture: client.picture
      };
      //Sign Token
      jwt.sign(payload, keys.secretKey, { expiresIn: 604800 }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token
        });
      });
    } else {
      const newClient = new Client({
        name: req.body.name,
        oid: req.body.oid,
        email: req.body.email,
        picture: req.body.picture
      });

      const payload = {
        oid: req.body.oid,
        name: req.body.name,
        email: req.body.email,
        picture: req.body.picture
      };

      newClient
        .save()
        .then(newclient => {
          jwt.sign(
            payload,
            keys.secretKey,
            { expiresIn: 604800 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        })
        .catch(err => console.log(err));
    }
  });
});

module.exports = router;
