import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import{getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "hire-me-5d595.firebaseapp.com",
  projectId: "hire-me-5d595",
  storageBucket: "hire-me-5d595.appspot.com",
  messagingSenderId: "808238913668",
  appId: "1:808238913668:web:6450ca9d32246d99fd0ad1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db=getFirestore();