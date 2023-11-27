import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD56DxKrTthp9NUrHmS39rrmIjv4jg0YIY",
  authDomain: "test-a191f.firebaseapp.com",
  databaseURL: "https://test-a191f-default-rtdb.firebaseio.com",
  projectId: "test-a191f",
  storageBucket: "test-a191f.appspot.com",
  messagingSenderId: "372988948906",
  appId: "1:372988948906:web:944cb74fb593fc50b8fbd3",
  measurementId: "G-SR3VRH13Z6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider()
