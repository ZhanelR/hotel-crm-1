import { initializeApp } from "firebase/app";
//import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMPf2ZkGgn5GS9Q7I6QyqgHbBPNtnlF4k",
  authDomain: "lab-2-auth-sagas.firebaseapp.com",
  projectId: "lab-2-auth-sagas",
  storageBucket: "lab-2-auth-sagas.appspot.com",
  messagingSenderId: "135251844227",
  appId: "1:135251844227:web:d03dc5ecce24e051cb8fb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default app;
export { auth };