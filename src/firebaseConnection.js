import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyA9_T7r1hQmqcu-yKwB9CepcOoXb4FFTvo",
  authDomain: "chatgpt-917f8.firebaseapp.com",
  projectId: "chatgpt-917f8",
  storageBucket: "chatgpt-917f8.appspot.com",
  messagingSenderId: "228379907384",
  appId: "1:228379907384:web:31563621a27363b7f15dcd",
};

// if (!firebase.apps.length) {
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// }

export default database;
