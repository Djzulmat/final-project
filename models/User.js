const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: {
    type: String,
    required: true
  },
  first_name: {
    type: String
    // required: true
  },
  last_name: {
    type: String
    // required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
    // required: true
  },
  date_of_birth: {
    type: Date
    // required: true
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
