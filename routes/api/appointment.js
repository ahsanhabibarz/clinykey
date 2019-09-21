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

//get appointment by chamberid & did
router.get(
  "/chamber/:cid",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const today = moment().startOf("day");

    console.log(req.user.oid + req.params.cid);

    Appointment.aggregate([
      {
        $lookup: {
          from: "patients-profiles", // other table name
          localField: "pid", // name of users table field
          foreignField: "patientID", // name of userinfo table field
          as: "pat_info" // alias for userinfo table
        }
      },
      { $unwind: "$pat_info" }, // $unwind used for getting data in object or for one record only
      // define some conditions here
      {
        $match: {
          $and: [
            { did: req.user.oid },
            { cid: req.params.cid },
            // { prescribed: false },
            {
              date: {
                $gte: today.toDate(),
                $lte: moment(today)
                  .endOf("day")
                  .toDate()
              }
            }
          ]
        }
      },

      { $sort: { date: 1 } },

      // define which fields are you want to fetch
      {
        $project: {
          _id: 1,
          date: 1,
          did: 1,
          cid: 1,
          prescribed: 1,
          name: "$pat_info.name",
          pid: 1
        }
      }
    ]).then(appointment => {
      if (appointment) {
        res.json(appointment);
      } else {
        return res.status(400).json({ error: "No Appointments" });
      }
    });
  }
);

module.exports = router;
