const crypto = require("crypto");
const classPrediction = require("../backend/services/inferenceService");
const suggest = require("../backend/services/suggest-ai");
const {
	storePredictData,
	getPredictHistoriesByUserId,
	getPredictDataByPredictId,
} = require("../backend/services/predictionAccess");

const predict = async (req, res) => {
	try {
		const loggedInUserId = req.session.idToken;
		if (!loggedInUserId) {
			return res.status(401).json({ error: "Unauthorized" });
		}
		if (!req.file) {
			return res.status(400).json({
				status: "error",
				message: "Image file is required",
			});
		}
		const imageBuffer = req.file.buffer;
		const model = req.app.locals.model;
		const { label, confidences } = await classPrediction(model, imageBuffer);

		const predictId = crypto.randomBytes(16).toString("hex");
		const createdAt = new Date().toISOString();
		const suggestion = await suggest(label);

		const data = {
			predictId: predictId,
			userId: loggedInUserId,
			result: label,
			confidences: `${confidences.toFixed(2)}%`,
			createdAt: createdAt,
			suggestion: suggestion,
		};

		await storePredictData(predictId, data);

		return res.status(201).json({
			status: "success",
			data,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};
const predictHistoriesByUserId = async (req, res) => {
	try {
		const loggedInUserId = req.session.idToken;
		if (!loggedInUserId) {
			return res.status(401).json({ error: "Unauthorized" });
		}
		const data = await getPredictHistoriesByUserId(loggedInUserId);
		if (!data) {
			return res.status(404).json({
				status: "error",
				message: "Data not found",
			});
		}
		return res.status(200).json({
			status: "success",
			data,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};
const predictDataByPredictId = async (req, res) => {
	try {
		const { predictId } = req.params;
		if (!predictId) {
			return res.status(400).json({
				status: "error",
				message: "Predict data is missing",
			});
		}
		const data = await getPredictDataByPredictId(predictId);

		return res.status(200).json({
			status: "success",
			data,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

module.exports = {
	predict,
	predictHistoriesByUserId,
	predictDataByPredictId,
};
