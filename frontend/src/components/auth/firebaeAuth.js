import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAxyqcEP1JpA7fbuUMKBEHeZ2TazbmlvF8",
  authDomain: "logintest-f2ab3.firebaseapp.com",
  databaseURL: "https://logintest-f2ab3-default-rtdb.firebaseio.com",
  projectId: "logintest-f2ab3",
  storageBucket: "logintest-f2ab3.appspot.com",
  messagingSenderId: "883411238316",
  appId: "1:883411238316:web:eb17f3805a991c68558e09",
  measurementId: "G-7R4B4QCY62"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

