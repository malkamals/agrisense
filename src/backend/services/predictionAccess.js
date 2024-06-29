const {
	getFirestore,
	setDoc,
	getDoc,
	getDocs,
	doc,
	collection,
	query,
	where,
} = require("../../config/firebase");

const db = getFirestore();

const storePredictData = async (predictId, data) => {
	const predictRef = doc(db, "predictions", predictId);
	await setDoc(predictRef, data);
};

const getPredictHistoriesByUserId = async (userId) => {
	const predictRef = collection(db, "predictions");
	const q = query(predictRef, where("userId", "==", userId));
	const predictSnap = await getDocs(q);
	const data = predictSnap.docs.map((doc) => doc.data());
	return data;
};

const getPredictDataByPredictId = async (predictId) => {
	const predictRef = doc(db, "predictions", predictId);
	const predictSnap = await getDoc(predictRef);
	return predictSnap.data();
};

module.exports = {
	storePredictData,
	getPredictHistoriesByUserId,
	getPredictDataByPredictId,
};
