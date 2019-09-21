const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String
  },
  quantity: {
    type: String
  }
});

module.exports = Medicines = mongoose.model("medicines", medSchema);
