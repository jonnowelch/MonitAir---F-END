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
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
    () => {
      handleLoginSuccess(email, uid, displayName, photoURL);
    };
  } else {
    // User is signed out.
    // ...
  }
});

export default firebase;
