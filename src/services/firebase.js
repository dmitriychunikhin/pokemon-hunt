import firebase from "firebase/app";
import "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd83qPtS90EbdQFQocu2fZ2olhjMI8K_w",
  authDomain: "zaratustrah-thegame.firebaseapp.com",
  databaseURL: "https://zaratustrah-thegame-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zaratustrah-thegame",
  storageBucket: "zaratustrah-thegame.appspot.com",
  messagingSenderId: "1004634499057",
  appId: "1:1004634499057:web:a8e568b2b88c4855e10650"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const db = app.database();

export default db;

