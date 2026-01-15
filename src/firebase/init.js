import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQXNuSGPFRxhOwhVOb5b9vTYc_IDYQj0M",
  authDomain: "fir-practice-c420e.firebaseapp.com",
  projectId: "fir-practice-c420e",
  storageBucket: "fir-practice-c420e.firebasestorage.app",
  messagingSenderId: "576766845080",
  appId: "1:576766845080:web:82454f832f13b03b1070ed",
  measurementId: "G-ZHE5TBNL58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
