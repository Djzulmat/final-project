const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// NOTE POST Register Route
router.post('/register', ctrl.auth.register);
// NOTE POST Login Route
router.post('/login', ctrl.auth.login);
// NOTE POST Logout Route
router.post('/logout', ctrl.auth.logout);
// NOTE POST Verify Route
router.post('/verify', authRequired, ctrl.auth.verify);

module.exports = router;