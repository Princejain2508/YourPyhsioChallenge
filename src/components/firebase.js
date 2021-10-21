import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEmyegAVExVmhMSz1mWQEFkXPJZmdIrN8",
  authDomain: "yourphysiochallenge.firebaseapp.com",
  projectId: "yourphysiochallenge",
  storageBucket: "yourphysiochallenge.appspot.com",
  messagingSenderId: "1094453748346",
  appId: "1:1094453748346:web:df00b4116652552bf2d1c3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
