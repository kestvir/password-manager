import firebase from "firebase";

const config = {
  apiKey: "AIzaSyArz4cprspLqGUUfw1O4fh6R23CKLwJml4",
  authDomain: "password-manager-36940.firebaseapp.com",
  databaseURL: "https://password-manager-36940.firebaseio.com",
  projectId: "password-manager-36940",
  storageBucket: "416470757278",
  messagingSenderId: "71063672906",
  appId: "1:416470757278:web:7f19702bd45367fab4308f",
};

firebase.initializeApp(config);

export default firebase;
