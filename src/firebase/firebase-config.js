import firebase  from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDHnOejFiXsWdnTzQ2SIOlw5QlLK6mg_zI",
    authDomain: "react-journal-c6696.firebaseapp.com",
    projectId: "react-journal-c6696",
    storageBucket: "react-journal-c6696.appspot.com",
    messagingSenderId: "284508563586",
    appId: "1:284508563586:web:c54f9962e656cfa2a46c9b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase,
  }
