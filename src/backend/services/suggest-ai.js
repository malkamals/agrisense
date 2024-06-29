require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const suggest = async (prediction) => {
	try {
		const ai = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY);
		const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

		const prompt = [
			"Kamu adalah konsultan pertanian, berikan saran perawatan untuk padi yang sudah matang batasi hanya untuk pemeliharaan dan terdiri dari 70 kata",
			"Kamu adalah konsultan pertanian, berikan saran perawatan untuk padi yang masih mentah batasi hanya untuk pemeliharaan dan terdiri dari 70 kata",
		];

		if (prediction === "Raw") {
			const result = await model.generateContent(prompt[1]);
			const response = await result.response;
			return response.text();
		}

		if (prediction === "Ripe") {
			const result = await model.generateContent(prompt[0]);
			const response = await result.response;
			return response.text();
		}
	} catch (error) {
		throw new Error(error.message);
	}
};

module.exports = suggest;
