import firebase from 'firebase';

firebase.initializeApp({
	serviceAccount: process.env.FIREBASE_CREDENTIALS
})