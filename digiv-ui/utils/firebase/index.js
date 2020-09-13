// const firebase = require("firebase/app");
// Required for side-effects
// require("firebase/firestore");
// If you enabled Analytics in your project, add the Firebase SDK for Analytics

const loadFireBase = () => {
	const config = {
		apiKey: ENV.FIREBASE_API_KEY,
        authDomain:ENV.FIREBASE_AUTH_DOMAIN,
        databaseURL: ENV.FIREBASE_DATABASE_URL,
        projectId: ENV.FIREBASE_PROJECT_ID,
        storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID
	};
	if (typeof window !== "undefined") {
		try {
			firebase.initializeApp(config);
		} catch (err) {
			if (!/already exists/.test(err.message)) {
				console.error("Firebase initialization error", err.stack);
			}
		}

		return {
			firebase: firebase,
			firestore: firebase.firestore(),
		};
	}
	return {
		firebase: {},
		firestore: {},
	};
};

export default loadFireBase;

// const config = {
// 	apiKey: ENV.FIREBASE_API_KEY,
// 	authDomain: ENV.FIREBASE_AUTH_DOMAIN,
// 	databaseURL: ENV.FIREBASE_DATABASE_URL,
// 	projectId: ENV.FIREBASE_PROJECT_ID,
// 	storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
// 	messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
// };
// if (typeof window !== "undefined" && firebase.apps.length) {
// 	firebase.initializeApp(config);
// }
// const auth = firebase.auth;
// const fireStore = firebase.firestore;
// export { auth, firebase, fireStore };
