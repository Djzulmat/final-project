const db = require("../models");

// NOTE Appoinment Index
const appointmentIndex = (req, res) => {
  const user_id = req.cookies.user_id;
  const role = req.cookies.role;

  if (role == "doctor") {
    db.Appointment.find({ Doctor: { _id: user_id } })
      .populate("User")
      .exec((err, allAppointments) => {
        if (err) return res.status(400).json({ status: 400, message: err });

        res.send(allAppointments);
      });
  } else {
    db.Appointment.find({ User: { _id: user_id } })
      .populate("User")
      .exec((err, allAppointments) => {
        if (err) return res.status(400).json({ status: 400, message: err });

        res.send(allAppointments);
      });
  }
};

// NOTE Appointment Show
const appointmentShow = (req, res) => {
  db.Appointment.findById(req.params.id, (err, foundAppointment) => {
    if (err) return res.status(400).json({ status: 400, message: err });

    res.send(foundAppointment);
  });
};

// NOTE Creating appointment
const createAppointment = (req, res) => {
  const doctorId = req.body.doctor_id;

  const newAppointment = {
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    purpose: req.body.purpose,
    User: req.cookies.user_id,
    Doctor: doctorId
  };

  db.Appointment.create(newAppointment, (err, savedAppointment) => {
    if (err) return res.status(500).json({ status: 500, message: err });

    res.send(savedAppointment);
  });
};

// NOTE Deleting Appointment
const deleteAppointment = (req, res) => {
  db.Appointment.findByIdAndDelete(req.params.id, (err, deletedAppointment) => {
    if (err) return res.status(500).json({ status: 500, message: err });

    res.send(deletedAppointment);
  });
};

// NOTE Edit Appointment
const editAppointment = (req, res) => {
  db.Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, editedAppointment) => {
      if (err) return res.status(400).json({ status: 400, message: err });

      res.send(editedAppointment);
    }
  );
};

module.exports = {
  appointmentIndex,
  appointmentShow,
  createAppointment,
  deleteAppointment,
  editAppointment
};
