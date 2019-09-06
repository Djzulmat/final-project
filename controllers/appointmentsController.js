const db = require('../models');

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


module.exports = {
    createAppointment
}