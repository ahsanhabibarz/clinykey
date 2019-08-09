const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  patientID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  area: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  hypertension: {
    type: Boolean,
    default: false
  },
  hypotension: {
    type: Boolean,
    default: false
  },
  diabetic: {
    type: Boolean,
    default: false
  },
  smoker: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Patient = mongoose.model("patients-profile", patientSchema);
