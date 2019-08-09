const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
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
  }
});

module.exports = Client = mongoose.model("clients", clientSchema);
