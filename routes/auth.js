const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// NOTE POST Register Route
router.post('/register', ctrl.auth.register);

module.exports = router;