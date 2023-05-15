
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "to-do-list-ba8d8.firebaseapp.com",
  projectId: "to-do-list-ba8d8",
  storageBucket: "to-do-list-ba8d8.appspot.com",
  messagingSenderId: "",
  appId: ""
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore(app);
export { auth, db }