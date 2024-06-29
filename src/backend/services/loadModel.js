const tf = require("@tensorflow/tfjs-node");

async function loadModel() {
	try {
		const modelUrl = process.env.MODEL_URL;
		const model = await tf.loadLayersModel(modelUrl);
		console.log("Model loaded successfully");
		return model;
	} catch (error) {
		console.error("Error loading model:", error);
		throw error;
	}
}

module.exports = loadModel;
