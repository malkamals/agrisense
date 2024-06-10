const {
	getAuth,
	getFirestore,
	setDoc,
	getDoc,
	doc,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	sendEmailVerification,
	sendPasswordResetEmail,
} = require("../config/firebase");

const auth = getAuth();
const db = getFirestore();

function registerUser(req, res) {
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
}

function loginUser(req, res) {
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
}

function getUserData(req, res) {
	onAuthStateChanged(auth, (user) => {
		const loggedInUserId = req.session.idToken;
		if (loggedInUserId) {
			const docRef = doc(db, "users", loggedInUserId);
			getDoc(docRef)
				.then((docSnapshot) => {
					if (docSnapshot.exists()) {
						const userData = docSnapshot.data();
						res.status(200).json({ userData });
					} else {
						res.status(404).json({ error: "User not found" });
					}
				})
				.catch((error) => {
					console.error(error);
					res.status(500).json({ error: "Internal Server Error" });
				});
		} else {
			res.status(401).json({ error: "Unauthorized" });
		}
	});
}

function logoutUser(req, res) {
	signOut(auth)
		.then(() => {
			req.session.idToken = null;
			res.status(200).json({ message: "User logged out successfully" });
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		});
}

function resetPassword(req, res) {
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
}

module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	resetPassword,
	getUserData,
};
