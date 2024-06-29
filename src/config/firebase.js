require("dotenv").config();
const admin = require("firebase-admin");
const { initializeApp } = require("firebase/app");
const {
	getFirestore,
	setDoc,
	getDoc,
	getDocs,
	doc,
	collection,
	query,
	where,
} = require("firebase/firestore");
const {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
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
const serviceAccount = {
	type: process.env.TYPE,
	project_id: process.env.PROJECT_ID,
	private_key_id: process.env.PRIVATE_KEY_ID,
	private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
	client_email: process.env.CLIENT_EMAIL,
	client_id: process.env.CLIENT_ID,
	auth_uri: process.env.AUTH_URI,
	token_uri: process.env.TOKEN_URI,
	auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
	client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
	universe_domain: process.env.UNIVERSE_DOMAIN,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

module.exports = {
	admin,
	getAuth,
	getFirestore,
	setDoc,
	getDoc,
	getDocs,
	doc,
	collection,
	query,
	where,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	sendEmailVerification,
	sendPasswordResetEmail,
};
