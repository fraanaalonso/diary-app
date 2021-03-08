import { firebase } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDlusBhCBli53Cr5tYGPO2jl75IEFK0Trg",
    authDomain: "journalapp-2bf1e.firebaseapp.com",
    projectId: "journalapp-2bf1e",
    storageBucket: "journalapp-2bf1e.appspot.com",
    messagingSenderId: "691014009239",
    appId: "1:691014009239:web:666cf16e37dd3b56d804d2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }
