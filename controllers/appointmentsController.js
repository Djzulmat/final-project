const db = require('../models');

// NOTE Appoinment Index
const appointmentIndex = (req, res) => {
    db.Appointment.find({}, (err, allAppointments) => {
        if (err) return res.status(400).json({ status: 400, message: err});

        res.send((allAppointments));
    });
};

// NOTE Appointment Show
const appointmentShow = (req, res) => {
    db.Appointment.findById(req.params.id, (err, foundAppointment) => {
        if (err) return res.status(400).json({ status: 400, message: err});

        res.send(foundAppointment);
    });
};


// NOTE Creating appointment
const createAppointment = (req, res) => {
    const doctorId = req.body.doctorId;

    const newAppointment = {
        title: req.body.title,
        description: req.body.description,
        User: req.session.currentUser.id,
        Doctor: doctorId
    };

    db.Appointment.create(newAppointment, (err, savedAppointment) => {
        if (err) return res.status(500).json({ status: 500, message: err });

        res.send(savedAppointment)
    });
};

// NOTE Deleting Appointment
const deleteAppointment = (req, res) => {
    db.Appointment.findByIdAndDelete(req.params.id, (err, deletedAppointment) => {
        if (err) return res.status(500).json({ status: 500, message: err});

        res.send(deletedAppointment);
    });
};

// NOTE Edit Appointment
const editAppointment = (req, res) => {
    db.Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, editedAppointment) => {
        if (err) return res.status(400).json({ status: 400, message: err});

        res.send(editedAppointment);
    });
};



module.exports = {
    appointmentIndex,
    appointmentShow,
    createAppointment,
    deleteAppointment,
    editAppointment
};