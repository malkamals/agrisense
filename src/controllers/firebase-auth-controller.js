const {
	getAuth,
	getFirestore,
	setDoc,
	getDoc,
	doc,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	sendEmailVerification,
	sendPasswordResetEmail,
} = require("../config/firebase");

const auth = getAuth();
const db = getFirestore();

const registerUser = (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({
			email: "Email is required",
			password: "Password is required",
		});
	}
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			sendEmailVerification(auth.currentUser)
				.then(() => {
					const user = userCredential.user;
					req.session.idToken = user.uid;
					const userData = {
						uid: user.uid,
						email: email,
						emailVerified: user.emailVerified,
						createdAt: new Date(),
					};
					const docRef = doc(db, "users", user.uid);
					setDoc(docRef, userData);
					res.status(201).json({
						message: "Verification email sent! User created successfully!",
						user: user,
					});
				})
				.catch((error) => {
					console.error(error);
					res.status(500).json({ error: "Error sending email verification" });
				});
		})
		.catch((error) => {
			const errorMessage =
				error.message || "An error occurred while registering user";
			res.status(500).json({ error: errorMessage });
		});
};

const loginUser = (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({
			email: "Email is required",
			password: "Password is required",
		});
	}
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			req.session.idToken = user.uid;
			res.status(200).json({ message: "User logged in successfully" });
		})
		.catch((error) => {
			console.error(error);
			const errorMessage =
				error.message || "An error occurred while logging in";
			res.status(500).json({ error: errorMessage });
		});
};

const getUserData = (req, res) => {
	const loggedInUserId = req.session.idToken;
	if (!loggedInUserId) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	const docRef = doc(db, "users", loggedInUserId);
	getDoc(docRef)
		.then((docSnapshot) => {
			if (!docSnapshot.exists()) {
				return res.status(404).json({ error: "User not found" });
			}
			const userData = docSnapshot.data();
			return res.status(200).json({ userData });
		})
		.catch((error) => {
			console.error(error);
			return res.status(500).json({ error: "Internal Server Error" });
		});
};

const logoutUser = (req, res) => {
	req.session.idToken = null;
	signOut(auth)
		.then(() => {
			res.status(200).json({ message: "User logged out successfully" });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		});
};

const resetPassword = (req, res) => {
	const { email } = req.body;
	if (!email) {
		return res.status(422).json({
			email: "Email is required",
		});
	}
	sendPasswordResetEmail(auth, email)
		.then(() => {
			res
				.status(200)
				.json({ message: "Password reset email sent successfully!" });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		});
};

module.exports = {
	registerUser,
	loginUser,
	getUserData,
	logoutUser,
	resetPassword,
};
