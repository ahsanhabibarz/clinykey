const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Appointment = require("../../models/Appointment");
const moment = require("moment");

// Book Appointment
router.post(
  "/set/:oid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const today = moment().startOf("day");
    Appointment.findOne({
      $and: [
        { did: req.params.oid },
        { pid: req.user.oid },
        { cid: req.body.cid },
        {
          date: {
            $gte: today.toDate(),
            $lte: moment(today)
              .endOf("day")
              .toDate()
          }
        }
      ]
    }).then(appointment => {
      if (appointment) {
        return res.status(400).json({ error: "Appointment Already Exists" });
      } else {
        const newAppointment = new Appointment({
          did: req.params.oid,
          pid: req.user.oid,
          cid: req.body.cid
        });

        newAppointment
          .save()
          .then(newAppointment => {
            res.json(newAppointment);
          })
          .catch(err => console.log(err));
      }
    });
  }
);

//Get appointment by doc oid
router.get("/:oid", (req, res) => {
  const today = moment().startOf("day");

  Appointment.find({
    $and: [
      { did: req.params.oid },
      {
        date: {
          $gte: today.toDate(),
          $lte: moment(today)
            .endOf("day")
            .toDate()
        }
      }
    ]
  })
    .sort({ date: 1 })
    .then(appointment => {
      if (appointment) {
        res.json(appointment);
      } else {
        return res.status(400).json({ error: "No Appointments" });
      }
    });
});

//get appointment by cid
router.get("/", (req, res) => {
  const today = moment().startOf("day");

  Appointment.find({
    $and: [
      { did: req.user.oid },
      { cid: req.params.cid },
      {
        date: {
          $gte: today.toDate(),
          $lte: moment(today)
            .endOf("day")
            .toDate()
        }
      }
    ]
  })
    .sort({ date: 1 })
    .then(appointment => {
      if (appointment) {
        res.json(appointment);
      } else {
        return res.status(400).json({ error: "No Appointments" });
      }
    });
});

module.exports = router;
