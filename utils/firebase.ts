import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDuoCZK9H9A5XAJJo_lBDLLFP5cKgM4RwU",
  authDomain: "financeguru-4f50a.firebaseapp.com",
  databaseURL: "https://financeguru-4f50a-default-rtdb.firebaseio.com",
  projectId: "financeguru-4f50a",
  storageBucket: "financeguru-4f50a.appspot.com",
  messagingSenderId: "651381121933",
  appId: "1:651381121933:web:a0a2bf3e79135bc1b113c4"
};

const firebase = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

export default firebase;
