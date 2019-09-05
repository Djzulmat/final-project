const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const authRequired = require('../middleware/authRequired');

// NOTE GET User Profile
router.get('/:id', authRequired, ctrl.users.show);

router.get('/', ctrl.users.index);

module.exports = router;