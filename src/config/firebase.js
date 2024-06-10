require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("./firebase.json");
const { initializeApp } = require("firebase/app");
const { getFirestore, setDoc, getDoc, doc } = require("firebase/firestore");
const {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	sendEmailVerification,
	sendPasswordResetEmail,
} = require("firebase/auth");

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
	measurementId: process.env.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

module.exports = {
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
};
