import { initializeApp } from "firebase/app";
import { getFireStore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyALkjRJzPfx0_RzZj_S4FBnJX4QZJ6wvQc",
  authDomain: "learn-firebase-9484c.firebaseapp.com",
  projectId: "learn-firebase-9484c",
  storageBucket: "learn-firebase-9484c.firebasestorage.app",
  messagingSenderId: "972322669693",
  appId: "1:972322669693:web:48c4aa0b52ec776810dd14",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Init services
const db = getFireStore();



