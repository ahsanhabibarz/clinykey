const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
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
  medicines: [
    {
      name: {
        type: String,
        required: true
      },
      morning: {
        quantity: {
          type: Number,
          default: 0
        },
        time: {
          type: Boolean,
          default: true
        }
      },
      noon: {
        quantity: {
          type: Number,
          default: 0
        },
        time: {
          type: Boolean,
          default: 0
        }
      },
      night: {
        quantity: {
          type: Number,
          default: 0
        },
        time: {
          type: Boolean,
          default: 0
        }
      },
      duration: {
        type: Number,
        required: true
      }
    }
  ],
  tests: {
    type: [String]
  },
  advices: {
    type: [String]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Prescription = mongoose.model(
  "prescriptions",
  prescriptionSchema
);
