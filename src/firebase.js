import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyD4Mc5zhz9YedN35tOLRhS2bAjaUfv6BRM",
  authDomain: "todoist-project-b0a93.firebaseapp.com",
  databaseURL: "https://todoist-project-b0a93.firebaseio.com",
  projectId: "todoist-project-b0a93",
  storageBucket: "todoist-project-b0a93.appspot.com",
  messagingSenderId: "1029012806908",
  appId: "1:1029012806908:web:d61efdf375d3e60dd08b79"
});

export { firebaseConfig as firebase };
