const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger.json");
const multer = require("multer");
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 1000000 }, // limit file size to 1MB
});
const {
	registerUser,
	loginUser,
	getUserData,
	logoutUser,
	resetPassword,
} = require("../controllers/firebase-auth-controller.js");
const {
	predict,
	predictHistoriesByUserId,
	predictDataByPredictId,
} = require("../controllers/predict-controller.js");

console.log(swaggerSpec);
router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerSpec));

// routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", getUserData);
router.post("/reset-password", resetPassword);
router.post("/logout", logoutUser);

//predict
router.post("/predict", upload.single("image"), predict);
router.get("/history", predictHistoriesByUserId);
router.get("/history/:predictId", predictDataByPredictId);

module.exports = router;
