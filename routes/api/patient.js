const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

const Patient = require("../../models/Patient");

router.post(
  "/profile/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.patientID = req.user.oid;
    profileFields.name = req.user.name;
    profileFields.email = req.user.email;
    profileFields.key = req.user.name + "this is a key";
    if (req.body.phone) profileFields.phone = req.body.phone;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.bloodGroup) profileFields.bloodGroup = req.body.bloodGroup;
    if (req.body.height) profileFields.height = req.body.height;
    if (req.body.weight) profileFields.weight = req.body.weight;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.area) profileFields.area = req.body.area;
    if (req.body.address) profileFields.address = req.body.address;
    if (req.body.hypertension)
      profileFields.hypertension = req.body.hypertension;
    if (req.body.hypotension) profileFields.hypotension = req.body.hypotension;
    if (req.body.diabetic) profileFields.diabetic = req.body.diabetic;
    if (req.body.smoker) profileFields.smoker = req.body.smoker;
    if (req.body.description) profileFields.description = req.body.description;
    if (req.body.picture) profileFields.picture = req.body.picture;

    Patient.findOne({ patientID: req.user.oid }).then(patient => {
      if (patient) {
        return res.status(400).json({ errors: "User already exists" });
      } else {
        Patient.findOne({ phone: profileFields.phone }).then(profile => {
          if (profile) {
            return res
              .status(400)
              .json({ errors: "That phone already exists" });
          }
          // Make new Profile
          new Patient(profileFields).save().then(patient => res.json(patient));
        });
      }
    });
  }
);

router.post(
  "/profile/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.patientID = req.user.oid;
    profileFields.name = req.user.name;
    profileFields.email = req.user.email;
    profileFields.key = req.user.name + "this is a key";
    if (req.body.phone) profileFields.phone = req.body.phone;
    if (req.body.gender) profileFields.gender = req.body.gender;
    if (req.body.age) profileFields.age = req.body.age;
    if (req.body.bloodGroup) profileFields.bloodGroup = req.body.bloodGroup;
    if (req.body.height) profileFields.height = req.body.height;
    if (req.body.weight) profileFields.weight = req.body.weight;
    if (req.body.city) profileFields.city = req.body.city;
    if (req.body.area) profileFields.area = req.body.area;
    if (req.body.address) profileFields.address = req.body.address;
    if (req.body.hypertension)
      profileFields.hypertension = req.body.hypertension;
    if (req.body.hypotension !== null)
      profileFields.hypotension = req.body.hypotension;
    if (req.body.diabetic !== null) profileFields.diabetic = req.body.diabetic;
    if (req.body.smoker !== null) profileFields.smoker = req.body.smoker;
    if (req.body.description) profileFields.description = req.body.description;
    if (req.body.picture) profileFields.picture = req.body.picture;

    Patient.findOne({ patientID: req.user.oid }).then(patient => {
      if (patient) {
        Patient.findOneAndUpdate(
          { patientID: req.user.oid },
          { $set: profileFields },
          { new: true }
        ).then(patient => res.json(patient));
      } else {
        return res.status(404).json({ profilenotfound: "Profile not found" });
      }
    });
  }
);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findOne({ patientID: req.user.oid })
      .then(patient => {
        if (!patient) {
          //return res.status(404).json({ Error: "Profile not found" });
          return res.json({});
        }
        res.json(patient);
      })
      .catch(err => console.log(err + "backend"));
  }
);

router.post(
  "/id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Patient.findOne({ patientID: req.body.pid })
      .then(patient => {
        if (!patient) {
          //return res.status(404).json({ Error: "Profile not found" });
          return res.json({});
        }
        res.json(patient);
      })
      .catch(err => console.log(err + "backend"));
  }
);

router.get("/profile/:handle", (req, res) => {
  Patient.findOne({ patientID: req.params.handle })
    .then(patient => {
      if (!patient) {
        return res.status(404).json({ Error: "Profile not found" });
      }
      res.json(patient);
    })
    .catch(err => console.log(err));
});

module.exports = router;
