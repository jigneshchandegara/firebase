// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD63M9mAeeABkBCDrnY35MHzg1QoDnRGuY",
  authDomain: "reactdemo-96fa8.firebaseapp.com",
  projectId: "reactdemo-96fa8",
  storageBucket: "reactdemo-96fa8.appspot.com",
  messagingSenderId: "641514159705",
  appId: "1:641514159705:web:e167c811f1d1bd7554fb48",
  measurementId: "G-DSRP5M81X4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export {app , firestore, storage} ;

