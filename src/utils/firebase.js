// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-app-425917.firebaseapp.com",
  projectId: "blog-app-425917",
  storageBucket: "blog-app-425917.appspot.com",
  messagingSenderId: "951553302609",
  appId: "1:951553302609:web:5c7320b899ced57a3c9870"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);