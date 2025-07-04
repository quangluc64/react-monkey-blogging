import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCcQwqdlTIoTEfjSZHJhebeyvMnWaq1CTQ",
  authDomain: "monkey-blogging-d6cb4.firebaseapp.com",
  projectId: "monkey-blogging-d6cb4",
  storageBucket: "monkey-blogging-d6cb4.firebasestorage.app",
  messagingSenderId: "727808158854",
  appId: "1:727808158854:web:3d9858ae28c7e2e1807507"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Init services
export const db = getFirestore(app);
export const auth = getAuth(app);



