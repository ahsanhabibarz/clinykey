const express = require("express");
const router = express.Router();
const request = require("request");
const cheerio = require("cheerio");
const Medicines = require("../../models/Medicines");
const Labtests = require("../../models/Labtests");

const url = "https://medex.com.bd/brands?alpha=";

router.post("/", (req, res) => {
  Medicines.find({ name: { $regex: "^" + req.body.med, $options: "i" } })
    .limit(12)
    .then(meds => {
      if (meds) {
        res.json(meds);
      } else {
        res.status(400).json({ error: "Medicine not found" });
      }
    });
});

// router.post("/getdata", (req, res) => {
//   for (let k = 1; k <= 16; k++) {
//     request(
//       `https://medex.com.bd/brands?alpha=z&page=${k}`,
//       (error, response, html) => {
//         if (!error && response.statusCode == 200) {
//           const $ = cheerio.load(html);
//           $(".hoverable-block").each((i, el) => {
//             const name = $(el)
//               .find(".data-row-top")
//               .text()
//               .trim();
//             const quantity = $(el)
//               .find(".data-row-strength")
//               .text()
//               .trim();
//             Medicines.findOne({
//               $and: [{ name: name }, { quantity: quantity }]
//             }).then(med => {
//               if (med) {
//                 console.log("alrady had");
//               } else {
//                 const newMed = new Medicines({
//                   name: name,
//                   quantity: quantity
//                 });
//                 newMed.save().then(med => {
//                   console.log(med.name);
//                 });
//               }
//             });
//           });
//         } else {
//           console.log(response.statusCode);
//         }
//       }
//     );
//   }
// });

router.post("/getdata", (req, res) => {
  request(
    `http://www.nhf.org.bd/hospital_charge.php?id=7`,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        let j = 0;
        $("tr").each((i, el) => {
          const name = $(el)
            .find(" td:nth-of-type(2) p")
            .text()
            .trim();
          const cost = $(el)
            .find(" td:nth-of-type(3) p")
            .text()
            .trim();

          Labtests.findOne({
            name: name
          }).then(med => {
            if (med) {
              console.log("alrady had");
            } else {
              const newMed = new Labtests({
                name: name,
                cost: parseFloat(cost.replace(",", ""))
              });
              newMed.save().then(med => {
                console.log(med.name);
              });
            }
          });
          j++;
        });

        console.log(j);
      } else {
        console.log(response.statusCode);
      }
    }
  );
});

module.exports = router;
