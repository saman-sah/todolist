
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCHcgMCDO7Na0bi-KJ20-e0w0VrdK95M3o",
  authDomain: "to-do-list-ba8d8.firebaseapp.com",
  projectId: "to-do-list-ba8d8",
  storageBucket: "to-do-list-ba8d8.appspot.com",
  messagingSenderId: "355533932198",
  appId: "1:355533932198:web:6daa1aa8155b402f2c1667"
};





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app);
export { auth }