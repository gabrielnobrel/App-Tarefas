import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

let firebaseConfig = {
  apiKey: "AIzaSyDjMEHKX3q-qUXUjOXiGyttymF__Fu7y7Q",
  authDomain: "meuapp-61d18.firebaseapp.com",
  databaseURL: "https://meuapp-61d18-default-rtdb.firebaseio.com",
  projectId: "meuapp-61d18",
  storageBucket: "meuapp-61d18.appspot.com",
  messagingSenderId: "816838169373",
  appId: "1:816838169373:web:1b6f897b1a934e33b307f4",
  measurementId: "G-R4L4S2SS8E",
};

// if (!firebase.apps.length) {
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
// }

export default database;
