// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBa6eNErvLpglc3rG4r5ItJhJ2bW0PFXjA",
	authDomain: "moratia-games.firebaseapp.com",
	projectId: "moratia-games",
	storageBucket: "moratia-games.appspot.com",
	messagingSenderId: "272164854465",
	appId: "1:272164854465:web:225445574bf1521b441240",
	measurementId: "G-8D7J8HM2VS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
