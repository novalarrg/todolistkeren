// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy-MJ3PK_LIwbCqSctbuO_fTRwdssv814",
  authDomain: "todolistkeren.firebaseapp.com",
  projectId: "todolistkeren",
  storageBucket: "todolistkeren.appspot.com",
  messagingSenderId: "587696381674",
  appId: "1:587696381674:web:115eff4c72173fd29e4193",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
