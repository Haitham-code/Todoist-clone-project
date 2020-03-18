import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBLhEB5IYQkTpdR_w2xpiFDJGOdHRc9uJ0",
  authDomain: "todoist-clone-f89fa.firebaseapp.com",
  databaseURL: "https://todoist-clone-f89fa.firebaseio.com",
  projectId: "todoist-clone-f89fa",
  storageBucket: "todoist-clone-f89fa.appspot.com",
  messagingSenderId: "186622474505",
  appId: "1:186622474505:web:79af492c1a0447671e7bd8"
});

export { firebaseConfig as firebase };
