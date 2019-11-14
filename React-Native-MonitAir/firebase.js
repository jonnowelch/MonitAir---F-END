import * as firebase from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCRVpCbCSC9yygrt3gQFaNsT8F6k-rePtk",
  authDomain: "brejconiesmonitair.firebaseapp.com",
  databaseURL: "https://brejconiesmonitair.firebaseio.com",
  projectId: "brejconiesmonitair",
  storageBucket: "brejconiesmonitair.appspot.com",
  messagingSenderId: "15250700957",
  appId: "1:15250700957:web:88d3aa3ee59d5a04a2f274",
  measurementId: "G-KSZ3DW01CF"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
