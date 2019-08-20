const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Prescription = require("../../models/Prescription");
const moment = require("moment");

//Get prescription by doc oid
// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Prescription.find({
//       pid: req.user.oid
//     })
//       .sort({ date: 1 })
//       .then(prescription => {
//         if (prescription) {
//           res.json(prescription);
//         } else {
//           return res.status(400).json({ error: "No Prescription" });
//         }
//       });
//   }
// );

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Prescription.aggregate([
      // Join with user_info table
      {
        $lookup: {
          from: "doctors-profiles", // other table name
          localField: "did", // name of users table field
          foreignField: "oid", // name of userinfo table field
          as: "doc_info" // alias for userinfo table
        }
      },
      { $unwind: "$doc_info" }, // $unwind used for getting data in object or for one record only
      // define some conditions here
      {
        $match: {
          pid: req.user.oid
        }
      },
      // define which fields are you want to fetch
      {
        $project: {
          _id: 1,
          medicines: 1,
          tests: 1,
          advices: 1,
          date: 1,
          did: 1,
          cid: 1,
          name: "$doc_info.name",
          pic: "$doc_info.picture",
          chambers: "$doc_info.chambers"
        }
      }
    ]).then(pres => {
      if (pres) {
        res.json(pres);
      }
    });
  }
);

module.exports = router;
