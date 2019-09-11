const express = require("express");
const router = express.Router();
const ctrl = require("../controllers");
const authRequired = require("../middleware/authRequired");

// NOTE GET User Profile
router.get("/me", authRequired, ctrl.users.show);
router.get("/doctors", authRequired, ctrl.users.doctors);

// router.get('/', ctrl.users.index);

module.exports = router;
