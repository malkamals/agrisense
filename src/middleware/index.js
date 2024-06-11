const { getAuth } = require("../config/firebase");
const auth = getAuth();

const verifyTokenBeforeLogin = async (req, res, next) => {
	const idToken =
		req.body.idToken || req.query.idToken || req.headers["authorization"];
	if (!idToken) {
		return res.status(403).json({ error: "No token provided" });
	}

	try {
		const decodedToken = await auth.verifyIdToken(idToken);
		req.user = decodedToken;
		res.status(200).json({ message: "Token verified successfully" });
		next();
	} catch (error) {
		console.error("Error verifying token:", error);
		return res.status(403).json({ error: "Unauthorized" });
	}
};
const verifyTokenAfterLogin = async (req, res, next) => {
	const idToken = req.session.idToken;
	if (idToken) {
		try {
			const decodedToken = await auth.verifyIdToken(idToken);
			req.user = decodedToken;
			return res.status(200).json({ message: "Token verified successfully" });
		} catch (error) {
			console.error("Error verifying token:", error);
			next();
			return res.status(403).json({ error: "Unauthorized" });
		}
	} else {
		res.json({ error: "No token provided" });
		next();
	}
};

module.exports = {
	verifyTokenBeforeLogin,
	verifyTokenAfterLogin,
};

// const {
// 	verifyTokenBeforeLogin,
// 	verifyTokenAfterLogin,
// } = require("../middleware");
