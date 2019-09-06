const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// NOTE Create a Post Route
router.post('/', authRequired, ctrl.appointments.createAppointment);

// NOTE Delete Appointment
router.delete('/:id', authRequired, ctrl.appointments.deleteAppointment);


module.exports = router;