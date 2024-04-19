// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore,doc,setDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-Aio7yymYPFoJMn6ecdwNB5U54oJvsHg",
  authDomain: "coinsavvy-22db5.firebaseapp.com",
  projectId: "coinsavvy-22db5",
  storageBucket: "coinsavvy-22db5.appspot.com",
  messagingSenderId: "315197116316",
  appId: "1:315197116316:web:a58f41fb3548e9da5c8259",
  measurementId: "G-W7DRNQS3G9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db= getFirestore(app);
const auth =getAuth(app);
const provider=new GoogleAuthProvider();

export {db,auth,provider,doc,setDoc};