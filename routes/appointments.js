const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// NOTE Appointment Index
router.get('/', authRequired, ctrl.appointments.appointmentIndex);

// NOTE Appointment Show
router.get('/:id', authRequired, ctrl.appointments.appointmentShow);

// NOTE Create Appointment Route
router.post('/', authRequired, ctrl.appointments.createAppointment);

// NOTE Delete Appointment
router.delete('/:id', authRequired, ctrl.appointments.deleteAppointment);

// NOTE Edit Appointment
router.put('/:id', authRequired, ctrl.appointments.editAppointment);


module.exports = router;