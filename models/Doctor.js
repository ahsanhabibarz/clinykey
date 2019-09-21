const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  oid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true
  },
  key: {
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
  category: {
    type: String,
    required: true
  },
  specializations: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  chambers: [
    {
      name: {
        type: String,
        required: true
      },
      cid: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      location: {
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
      fee: {
        type: Number,
        required: true
      },
      from: {
        type: String,
        required: true
      },
      to: {
        type: String,
        required: true
      },
      days: {
        type: [String],
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  rating: [
    {
      patientID: String,
      rate: Number
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

DoctorSchema.index({ "$**": "text" });

module.exports = Doctor = mongoose.model("doctors-profile", DoctorSchema);
