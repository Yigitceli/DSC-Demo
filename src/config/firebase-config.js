// Import the functions you need from the SDKs you need
import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from "@firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBduIIELaUgRN75dxGR7ep2Etspj3ZQugU",
  authDomain: "fir-project-d9df0.firebaseapp.com",
  projectId: "fir-project-d9df0",
  storageBucket: "fir-project-d9df0.appspot.com",
  messagingSenderId: "945704550323",
  appId: "1:945704550323:web:108fd173b879e9e9e1d5c6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();


