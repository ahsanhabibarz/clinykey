const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labtestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number
  }
});

module.exports = Labtests = mongoose.model("labtests", labtestSchema);
