const {
	admin,
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

const registerUser = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({
			email: "Email is required",
			password: "Password is required",
		});
	}

	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		await sendEmailVerification(auth.currentUser);
		console.log(
			"Verification email sent! Please verify your email in 3 minutes."
		);

		const user = userCredential.user;
		const userData = {
			uid: user.uid,
			email: email,
			photoUrl: user.photoURL || null,
			displayName: user.displayName || null,
			phoneNumber: user.phoneNumber || null,
			emailVerified: user.emailVerified,
			createdAt: new Date(),
		};

		const docRef = doc(db, "users", user.uid);
		await setDoc(docRef, userData);
		///
		let emailVerify = false;
		const maxRetries = 180; // 3 menit = 180 detik
		let retries = 0;

		while (!emailVerify && retries < maxRetries) {
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Tunggu 1 detik
			const userRecord = await admin.auth().getUser(user.uid);
			emailVerify = userRecord.emailVerified;
			if (emailVerify) {
				await setDoc(
					doc(db, "users", user.uid),
					{ emailVerified: emailVerify },
					{ merge: true }
				);
				console.log("Email verification status updated");
			}
			retries++;
		}
		if (emailVerify) {
			res.status(201).json({ message: "User created successfully!" });
		} else {
			res.status(200).json({
				message: "User created, but email not verified within the time limit.",
			});
		}
		///
	} catch (error) {
		console.error(error);
		const errorMessage =
			error.message || "An error occurred while registering user";
		res.status(500).json({ error: errorMessage });
	}
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
			res.status(200).json({
				message: "User logged in successfully",
				user: user,
			});
		})
		.catch((error) => {
			console.error(error);
			const errorMessage =
				error.message || "An error occurred while logging in";
			res.status(500).json({ error: errorMessage });
		});
};

const getUserData = async (req, res) => {
	const loggedInUserId = req.session.idToken;
	if (!loggedInUserId) {
		return res.status(401).json({ error: "Unauthorized" });
	}

	try {
		const docRef = doc(db, "users", loggedInUserId);
		const docSnapshot = await getDoc(docRef);

		if (!docSnapshot.exists()) {
			return res.status(404).json({ error: "User not found" });
		}

		const userData = docSnapshot.data();
		return res.status(200).json({ userData });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
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
