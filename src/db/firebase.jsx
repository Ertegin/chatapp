// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase} from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMP3ul02J23uyAKsoQi1X1Y3fkI011hts",
  authDomain: "chatapp-a6315.firebaseapp.com",
  databaseURL: "https://chatapp-a6315-default-rtdb.firebaseio.com",
  projectId: "chatapp-a6315",
  storageBucket: "chatapp-a6315.firebasestorage.app",
  messagingSenderId: "601763680576",
  appId: "1:601763680576:web:0449ba0bf04f47baf8eaa5",
  measurementId: "G-369M6B7P9J"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
