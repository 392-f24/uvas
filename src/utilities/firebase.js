import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCUjAaPPYM78JrAfQEw3yWk6pY4LtTL5e8",
    authDomain: "cs392-uvas.firebaseapp.com",
    projectId: "cs392-uvas",
    storageBucket: "cs392-uvas.appspot.com",
    messagingSenderId: "169320414468",
    appId: "1:169320414468:web:0880218a0fb2af1b462451",
    measurementId: "G-HVZN6336WK"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };