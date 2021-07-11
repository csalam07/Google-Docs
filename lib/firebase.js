import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBH4HSUdFkLwZCs5WuI-BGufPWIr5g_L4I",
  authDomain: "react-1e789.firebaseapp.com",
  databaseURL: "https://react-1e789-default-rtdb.firebaseio.com",
  projectId: "react-1e789",
  storageBucket: "react-1e789.appspot.com",
  messagingSenderId: "452874395804",
  appId: "1:452874395804:web:bc9db07fc927f1927ecd59",
  measurementId: "G-3T39HXFJ62",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
