const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  status: {
    type: String,
    default: "pending",
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  start_time: {
    type: String
    // required: true
  },
  end_time: {
    type: String
    // required: true
  },
  User: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  Doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor"
  }
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
