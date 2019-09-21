const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  did: {
    type: String,
    required: true
  },
  cid: {
    type: String,
    required: true
  },
  pid: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  prescribed: {
    type: Boolean,
    default: false
  }
});

module.exports = Appointment = mongoose.model(
  "appointments",
  appointmentSchema
);
