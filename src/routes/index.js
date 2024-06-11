const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.json");
const {
	registerUser,
	loginUser,
	getUserData,
	logoutUser,
	resetPassword,
} = require("../controllers/firebase-auth-controller.js");

console.log(swaggerSpec);
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerSpec));

// routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", getUserData);
router.post("/reset-password", resetPassword);
router.post("/logout", logoutUser);

module.exports = router;
