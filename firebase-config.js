// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhZbQc5sGnvJxoMaJEMoOTeExYIqh4qCY",
  authDomain: "hr-tech-game.firebaseapp.com",
  projectId: "hr-tech-game",
  storageBucket: "hr-tech-game.firebasestorage.app",
  messagingSenderId: "569987823752",
  appId: "1:569987823752:web:f1ebb8242e1d5e1907473d",
  measurementId: "G-ZKT80ZSR76"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
