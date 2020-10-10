import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDmhYk9PYNz8Xcc7iJh-5sekD0HHHfC-AE",
  authDomain: "e-commerce-9e1cd.firebaseapp.com",
  databaseURL: "https://e-commerce-9e1cd.firebaseio.com",
  projectId: "e-commerce-9e1cd",
  storageBucket: "e-commerce-9e1cd.appspot.com",
  messagingSenderId: "183724886269",
  appId: "1:183724886269:web:b15f006099358607cd1694",
  measurementId: "G-7CFH9M584X",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
