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
    type: [String],
    required: true
  },
  searchtags: {
    type: [String]
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
        type: String,
        required: true
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
        type: Date,
        required: true
      },
      to: {
        type: Date,
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
  date: {
    type: Date,
    default: Date.now
  }
});

DoctorSchema.index({ "$**": "text" });

module.exports = Doctor = mongoose.model("doctors-profile", DoctorSchema);
