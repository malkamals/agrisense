const verifyTokenBeforeLogin = async (req, res, next) => {
	if (!idToken) {
		return res.status(403).redirect("/api/login");
		// res.json({ error: "No token provided" });
	}

	try {
		req.session.idToken = idToken;
		// const decodedToken = await admin.auth().verifyIdToken(idToken);
		// req.user = decodedToken;
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
			req.session.idToken = idToken;
			// const decodedToken = await admin.auth().verifyIdToken(idToken);
			// req.user = decodedToken;
			return res.redirect("/api/dashboard");
		} catch (error) {
			next();
			// console.error("Error verifying token:", error);
			// return res.status(403).json({ error: "Unauthorized" });
		}
	} else {
		next();
		// res.json({ error: "No token provided" });
	}
};

module.exports = {
	verifyTokenBeforeLogin,
	verifyTokenAfterLogin,
};
