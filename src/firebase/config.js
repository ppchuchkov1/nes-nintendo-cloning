import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC6VFBABgBYgnbHcHVhndNPA8d0LBNisJk",
  authDomain: "gaming-console-nes.firebaseapp.com",
  projectId: "gaming-console-nes",
  storageBucket: "gaming-console-nes.appspot.com",
  messagingSenderId: "387736105616",
  appId: "1:387736105616:web:99f86d9078381e5b305e15",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

export default firebaseApp;
