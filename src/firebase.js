import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const authConfig = {
  apiKey: "AIzaSyDMPf2ZkGgn5GS9Q7I6QyqgHbBPNtnlF4k",
  authDomain: "lab-2-auth-sagas.firebaseapp.com",
  projectId: "lab-2-auth-sagas",
  storageBucket: "lab-2-auth-sagas.appspot.com",
  messagingSenderId: "135251844227",
  appId: "1:135251844227:web:d03dc5ecce24e051cb8fb6"
};

const firestoreConfig = {
  apiKey: "AIzaSyCbGZ5jRYFfIeG3aBzcXDIy7wNwsXvMRwo",
  authDomain: "lab-2-firestore-rooms.firebaseapp.com",
  projectId: "lab-2-firestore-rooms",
  storageBucket: "lab-2-firestore-rooms.appspot.com",
  messagingSenderId: "367548080302",
  appId: "1:367548080302:web:7a5f37dd6c863550f3cd3f"
};

const firebaseConfig = {
  authConfig,
  firestoreConfig
};

const app = initializeApp(firebaseConfig.authConfig, "authFirebase");
const db = getFirestore(app);
const auth = getAuth(app);

const appFirestore = initializeApp(firebaseConfig.firestoreConfig, "firestore");
const dbFirestore = getFirestore(appFirestore);

export { auth, db, app, appFirestore, dbFirestore };


/* код до добавления БД
//const app = initializeApp(authConfig);
const app = initializeApp();
firebase.initializeApp(firebaseConfig.authConfig); 
const db = firebase.firestore(firebaseConfig.firestoreConfig);
const auth = getAuth(app);
//export default app;
export { auth };
export default firebaseConfig; */