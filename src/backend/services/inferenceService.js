const tf = require("@tensorflow/tfjs-node");
const InputError = require("../error/InputError");

async function classPrediction(model, imageBuffer) {
	try {
		const tensor = tf.node
			.decodeJpeg(imageBuffer, 3)
			.resizeNearestNeighbor([160, 160])
			.toFloat()
			.div(tf.scalar(255.0))
			.expandDims();

		const prediction = model.predict(tensor);
		const scores = await prediction.data();

		const confidences = Math.max(...scores) + 50;
		const classes = ["Raw", "Ripe"];
		const label = confidences > 50 ? classes[1] : classes[0];

		console.log({
			prediction,
			scores,
			label,
			confidences,
		});

		return { label, confidences };
	} catch (error) {
		throw new InputError("Terjadi kesalahan saat melakukan prediksi");
	}
}

module.exports = classPrediction;
