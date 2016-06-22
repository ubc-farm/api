import firebase from 'firebase';

/**
 * Initializes the firebase app so other modules can use it
 */
firebase.initializeApp({
	serviceAccount: process.env.FIREBASE_CREDENTIALS,
	databaseURL: process.env.FIREBASE_DATABASE
})

export default firebase;