const express = require("express");
const router = express.Router();
const {
	verifyTokenBeforeLogin,
	verifyTokenAfterLogin,
} = require("../middleware");

const {
	registerUser,
	loginUser,
	logoutUser,
	resetPassword,
	getUserData,
} = require("../controllers/firebase-auth-controller.js");

// Auth routes
router.post("/api/register", registerUser);
router.post("/api/login", loginUser);
router.post("/api/user", getUserData);
router.post("/api/reset-password", resetPassword);
router.post("/api/logout", logoutUser);

//posts routes
module.exports = router;
