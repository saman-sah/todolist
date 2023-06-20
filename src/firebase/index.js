
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCo8sTvBcwoSqoFcrYg1IjjFhXrVnGT5XA",
  authDomain: "new-todo-list-8f871.firebaseapp.com",
  projectId: "new-todo-list-8f871",
  storageBucket: "new-todo-list-8f871.appspot.com",
  messagingSenderId: "233679999665",
  appId: "1:233679999665:web:da5c8ef69e91f108da0890"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
const db = getFirestore(app);
export { auth, db }