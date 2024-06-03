const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware");

const firebaseAuthController = require("../controllers/firebase-auth-controller");
const loginCheck = require("../controllers/login-check.js");

// Auth routes
router.post("/api/register", firebaseAuthController.registerUser);
router.post("/api/login", firebaseAuthController.loginUser);
router.post("/api/logout", firebaseAuthController.logoutUser);
router.post("/api/reset-password", firebaseAuthController.resetPassword);

//posts routes
router.post("/api/login-check", verifyToken, loginCheck.getCheck);

module.exports = router;
