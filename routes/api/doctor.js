const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

const Doctor = require("../../models/Doctor");

const filter = require("../../validations/filter");

// router.get("/profile/all", (req, res) => {
//   const errors = {};

//   Doctor.aggregate([
//     { $unwind: "$rating" },
//     {
//       $group: {
//         _id: "$_id",
//         avgRate: { $avg: "$rating.rate" },
//         doc: { $first: "$$ROOT" }
//       }
//     },
//     {
//       $project: {
//         oid: "$doc.oid",
//         name: "$doc.name",
//         email: "$doc.email",
//         avgrating: "$avgRate",
//         picture: "$doc.picture",
//         key: "$doc.key",
//         phone: "$doc.phone",
//         gender: "$doc.gender",
//         category: "$doc.category",
//         specializations: "$doc.specializations",
//         education: "$doc.education",
//         designation: "$doc.designation",
//         chambers: "$doc.chambers",
//         date: "$doc.date",
//         rating: "$doc.rating"
//       }
//     },
//     {
//       $sort: { avgrating: -1 }
//     }
//   ]).then(doctor => {
//     res.json(doctor);
//   });
// });

// router.get("/profile/all/:search", (req, res) => {
//   const errors = {};
//   Doctor.aggregate([
//     { $unwind: "$rating" },
//     {
//       $group: {
//         _id: "$_id",
//         avgRate: { $avg: "$rating.rate" },
//         doc: { $first: "$$ROOT" }
//       }
//     },
//     {
//       $project: {
//         oid: "$doc.oid",
//         name: "$doc.name",
//         email: "$doc.email",
//         avgrating: "$avgRate",
//         picture: "$doc.picture",
//         key: "$doc.key",
//         phone: "$doc.phone",
//         gender: "$doc.gender",
//         category: "$doc.category",
//         specializations: "$doc.specializations",
//         education: "$doc.education",
//         designation: "$doc.designation",
//         chambers: "$doc.chambers",
//         date: "$doc.date",
//         rating: "$doc.rating"
//       }
//     },
//     {
//       $match: {
//         $or: [
//           { name: { $regex: req.params.search, $options: "i" } },
//           { gender: { $regex: req.params.search, $options: "i" } },
//           { key: { $regex: req.params.search, $options: "i" } },
//           { phone: { $regex: req.params.search, $options: "i" } },
//           { category: { $regex: req.params.search, $options: "i" } },
//           { education: { $regex: req.params.search, $options: "i" } },
//           { specializations: { $regex: req.params.search, $options: "i" } },
//           { designation: { $regex: req.params.search, $options: "i" } },
//           { "chambers.location": { $regex: req.params.search, $options: "i" } },
//           { "chambers.area": { $regex: req.params.search, $options: "i" } },
//           { "chambers.city": { $regex: req.params.search, $options: "i" } },
//           { "chambers.name": { $regex: req.params.search, $options: "i" } },
//           {
//             "chambers.fee": {
//               $gte: parseInt(req.params.search) - 100,
//               $lte: parseInt(req.params.search) + 100
//             }
//           },
//           { "chambers.address": { $regex: req.params.search, $options: "i" } },
//           { "chambers.days": { $regex: req.params.search, $options: "i" } }
//         ]
//       }
//     },
//     {
//       $sort: { avgrating: -1 }
//     }
//   ]).then(doctor => {
//     res.json(doctor);
//   });
// });

router.get("/profile/all", (req, res) => {
  const errors = {};

  Doctor.aggregate([
    { $match: { chambers: { $ne: [] } } },
    { $unwind: "$rating" },
    {
      $group: {
        _id: "$_id",
        avgRate: { $avg: "$rating.rate" },
        doc: { $first: "$$ROOT" }
      }
    },
    {
      $project: {
        oid: "$doc.oid",
        name: "$doc.name",
        email: "$doc.email",
        avgrating: "$avgRate",
        picture: "$doc.picture",
        key: "$doc.key",
        phone: "$doc.phone",
        gender: "$doc.gender",
        category: "$doc.category",
        specializations: "$doc.specializations",
        education: "$doc.education",
        designation: "$doc.designation",
        chambers: "$doc.chambers",
        date: "$doc.date",
        rating: "$doc.rating"
      }
    },
    {
      $sort: { avgrating: -1 }
    }
  ]).then(doctor => {
    res.json(doctor);
  });
});

/// Test
router.get("/profile/all/:search", (req, res) => {
  const errors = {};

  let { filteredString, money, gender, day } = filter(req.params.search);

  // let match = {
  //   $match: {
  //     $and: [
  //       { $text: { $search: filteredString } },
  //       {
  //         "chambers.fee": {
  //           $lte: money
  //         }
  //       },
  //       { gender: gender },
  //       { "chambers.days": { $regex: day, $options: "i" } }
  //     ]
  //   }
  // };

  let customMatch = {
    $match: {
      $and: [
        {
          "chambers.fee": {
            $lte: money
          }
        }
      ]
    }
  };

  if (filteredString.length > 2) {
    customMatch.$match.$and.push({ $text: { $search: filteredString } });
  }

  if (gender !== "") {
    customMatch.$match.$and.push({ gender: gender });
  }
  if (day !== "") {
    customMatch.$match.$and.push({ "chambers.days": day });
  }

  // console.log(gender);

  // if (gender === "") {
  //   match = {
  //     $match: {
  //       $and: [
  //         { $text: { $search: filteredString } },
  //         {
  //           "chambers.fee": {
  //             $lte: money
  //           }
  //         }
  //       ]
  //     }
  //   };
  // }
  // if (filteredString === "") {
  //   match = {
  //     $match: {
  //       $and: [
  //         {
  //           "chambers.fee": {
  //             $lte: money
  //           }
  //         },
  //         { gender: gender }
  //       ]
  //     }
  //   };
  // }
  // if (filteredString === "" && gender === "") {
  //   match = {
  //     $match: {
  //       "chambers.fee": {
  //         $lte: money
  //       }
  //     }
  //   };
  // }

  Doctor.aggregate([
    customMatch,
    { $unwind: "$rating" },
    {
      $group: {
        _id: "$_id",
        avgRate: { $avg: "$rating.rate" },
        doc: { $first: "$$ROOT" }
      }
    },
    {
      $project: {
        oid: "$doc.oid",
        name: "$doc.name",
        email: "$doc.email",
        avgrating: "$avgRate",
        picture: "$doc.picture",
        key: "$doc.key",
        phone: "$doc.phone",
        gender: "$doc.gender",
        category: "$doc.category",
        specializations: "$doc.specializations",
        education: "$doc.education",
        designation: "$doc.designation",
        chambers: "$doc.chambers",
        date: "$doc.date",
        rating: "$doc.rating"
      }
    },
    {
      $sort: { avgrating: -1 }
    }
  ]).then(doctor => {
    res.json(doctor);
  });
});

// Get Profile By Oid

router.get("/profile/:oid", (req, res) => {
  const errors = {};

  Doctor.aggregate([
    { $unwind: "$rating" },
    {
      $group: {
        _id: "$_id",
        avgRate: { $avg: "$rating.rate" },
        doc: { $first: "$$ROOT" }
      }
    },
    {
      $project: {
        oid: "$doc.oid",
        name: "$doc.name",
        email: "$doc.email",
        avgrating: "$avgRate",
        picture: "$doc.picture",
        key: "$doc.key",
        phone: "$doc.phone",
        gender: "$doc.gender",
        category: "$doc.category",
        specializations: "$doc.specializations",
        education: "$doc.education",
        designation: "$doc.designation",
        chambers: "$doc.chambers",
        date: "$doc.date",
        rating: "$doc.rating"
      }
    },
    {
      $match: {
        oid: req.params.oid
      }
    }
  ])
    .then(doctor => {
      res.json(doctor);
    })
    .catch(err => res.status(404).json(err));
});

// Get All Doctors

router.get("/profile/allx", (req, res) => {
  const errors = {};

  Doctor.find()
    .then(doctors => {
      if (!doctors) {
        errors.noprofile = "There are no profile";
        return res.status(404).json(errors);
      }
      res.json(doctors);
    })
    .catch(err => res.status(404).json({ profile: "There is no profile" }));
});

// Get All Doctors By name

router.get("/profile/:search", (req, res) => {
  const errors = {};

  Doctor.find({
    $or: [
      { name: { $regex: req.params.search, $options: "i" } },
      { gender: { $regex: req.params.search, $options: "i" } },
      { specializations: { $regex: req.params.search, $options: "i" } },
      { "experience.title": { $regex: req.params.search, $options: "i" } },
      { "experience.institution": { $regex: req.params.search, $options: "i" } }
    ]
  })
    .populate("client", ["name", "email"])
    .then(doctors => {
      if (!doctors) {
        errors.noprofile = "There are no profile";
        return res.status(404).json(errors);
      }
      res.json(doctors);
    })
    .catch(err => res.status(404).json({ profile: "There is no profile" }));
});

router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //const { errors, isValid } = validateProfileInput(req.body);

    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    const profileFields = {};
    const tags = [];
    profileFields.client = req.user.id;
    tags.push(req.user.id);
    tags.push(req.user.name);

    profileFields.name = req.user.name;
    profileFields.key = req.user.name + "this is a key";
    if (req.body.phone) profileFields.phone = req.body.phone;
    if (req.body.gender) {
      profileFields.gender = req.body.gender;
      tags.push(req.body.gender);
    }
    if (req.body.bio) profileFields.bio = req.body.bio;

    if (typeof req.body.specializations !== undefined) {
      profileFields.specializations = req.body.specializations.split(",");
    }

    profileFields.searchtags = tags;

    profileFields.social = {};

    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.linkdin) profileFields.social.linkdin = req.body.linkdin;

    Doctor.findOne({ user: req.user.id }).then(doctor => {
      if (doctor) {
        Doctor.findOneAndUpdate(
          { client: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(doctor => res.json(doctor));
      } else {
        Doctor.findOne({ phone: profileFields.phone }).then(profile => {
          if (profile) {
            errors.handle = "That phone already exists";
            return res.status(400).json(errors);
          }
          // Make new Profile
          new Doctor(profileFields).save().then(doctor => res.json(doctor));
        });
      }
    });
  }
);

// Update or Create Doctor Profile
router.post(
  "/profile/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {};
    profileFields.oid = req.user.oid;
    profileFields.name = req.user.name;
    profileFields.email = req.user.email;
    profileFields.key = req.user.name + "this is a key";
    if (req.body.phone) profileFields.phone = req.body.phone;
    if (req.body.gender) {
      profileFields.gender = req.body.gender;
    }
    profileFields.picture = req.user.picture;
    if (req.body.education) profileFields.education = req.body.education;
    if (req.body.designation) profileFields.designation = req.body.designation;
    if (req.body.category) profileFields.category = req.body.category;
    if (req.body.specializations)
      profileFields.specializations = req.body.specializations;

    profileFields.rating = { patientID: "A", rate: 10 };

    Doctor.findOne({ oid: req.user.oid }).then(doctor => {
      if (doctor) {
        Doctor.findOneAndUpdate(
          { oid: req.user.oid },
          { $set: profileFields },
          { new: true }
        ).then(doctor => {
          Doctor.aggregate([
            { $unwind: "$rating" },
            {
              $group: {
                _id: "$_id",
                avgRate: { $avg: "$rating.rate" },
                doc: { $first: "$$ROOT" }
              }
            },
            {
              $project: {
                oid: "$doc.oid",
                name: "$doc.name",
                email: "$doc.email",
                avgrating: "$avgRate",
                picture: "$doc.picture",
                key: "$doc.key",
                phone: "$doc.phone",
                gender: "$doc.gender",
                category: "$doc.category",
                specializations: "$doc.specializations",
                education: "$doc.education",
                designation: "$doc.designation",
                chambers: "$doc.chambers",
                date: "$doc.date",
                rating: "$doc.rating"
              }
            },
            {
              $match: {
                oid: doctor.oid
              }
            }
          ])
            .then(doctor => {
              res.json(doctor);
            })
            .catch(err => res.status(404).json(err));
        });
      } else {
        Doctor.findOne({ email: profileFields.email }).then(profile => {
          if (profile) {
            return res.status(400).json({ errors: "asdsaads" });
          }
          // Make new Profile
          new Doctor(profileFields).save().then(doctor => {
            Doctor.aggregate([
              { $unwind: "$rating" },
              {
                $group: {
                  _id: "$_id",
                  avgRate: { $avg: "$rating.rate" },
                  doc: { $first: "$$ROOT" }
                }
              },
              {
                $project: {
                  oid: "$doc.oid",
                  name: "$doc.name",
                  email: "$doc.email",
                  avgrating: "$avgRate",
                  picture: "$doc.picture",
                  key: "$doc.key",
                  phone: "$doc.phone",
                  gender: "$doc.gender",
                  category: "$doc.category",
                  specializations: "$doc.specializations",
                  education: "$doc.education",
                  designation: "$doc.designation",
                  chambers: "$doc.chambers",
                  date: "$doc.date",
                  rating: "$doc.rating"
                }
              },
              {
                $match: {
                  oid: doctor.oid
                }
              }
            ])
              .then(doctor => {
                res.json(doctor);
              })
              .catch(err => res.status(404).json(err));
          });
        });
      }
    });
  }
);

router.post(
  "/addchamber",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Doctor.findOne({ oid: req.user.oid })
      .then(profile => {
        const newExp = {
          cid: req.body.cid,
          name: req.body.name,
          area: req.body.area,
          city: req.body.city,
          address: req.body.address,
          fee: req.body.fee,
          from: req.body.from,
          to: req.body.to,
          days: req.body.days
        };
        //add to exp array
        profile.chambers.unshift(newExp);
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(400).json({ errors: err }));
  }
);

router.post(
  "/editchamber",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newExp = {
      cid: req.body.cid,
      name: req.body.name,
      area: req.body.area,
      city: req.body.city,
      address: req.body.address,
      fee: req.body.fee,
      from: req.body.startTime,
      to: req.body.endTime,
      days: ["Friday", "Saturday"]
    };

    Doctor.updateOne(
      { oid: req.user.oid, "chambers.cid": req.body.cid },
      { $set: { "chambers.$": newExp } }
    )
      .then(mod => {
        if (mod.nModified != 0) {
          res.json({ success: "modified" });
        } else {
          res.status(404).json({ errors: "Failed" });
        }
      })
      .catch(err => {
        res.status(404).json({ errors: "Failed" });
      });
  }
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      oid: req.user.oid,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
