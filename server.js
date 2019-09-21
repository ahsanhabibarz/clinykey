const express = require("express");
const cookieSession = require("cookie-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const keys = require("./config/keys");

const auth = require("./routes/api/auth");
const clients = require("./routes/api/clients");
const doctor = require("./routes/api/doctor");
const patient = require("./routes/api/patient");
const appointment = require("./routes/api/appointment");
const prescription = require("./routes/api/prescription");
const scraper = require("./routes/api/scraper");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db connection
//Thsis

const db = keys.mongoURI;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("DB CONNECTED"))
  .catch(err => console.log(err));

app.use(passport.initialize());
//passport config
require("./config/passport")(passport);

app.use("/api", auth);
app.use("/api/clients", clients);
app.use("/api/scraper", scraper);
app.use("/api/appointment", appointment);
app.use("/api/prescription", prescription);
app.use("/api/doctor", doctor);
app.use("/api/patient", patient);

// This is a comment

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running in port ${port}`));
