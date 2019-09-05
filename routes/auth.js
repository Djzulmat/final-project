const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

// NOTE POST Register Route
router.post('/register', ctrl.auth.register);
// NOTE POST Login Route
router.post('/login', ctrl.auth.login);

module.exports = router;