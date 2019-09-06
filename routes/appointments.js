const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// NOTE Create a Post Route
router.post('/', authRequired, ctrl.appointments.createAppointment);


module.exports = router;