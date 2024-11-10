// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBupDWDD_RLImTGPWJz5RAt-xVjK0For5g",
  authDomain: "gadget-heaven-495ae.firebaseapp.com",
  projectId: "gadget-heaven-495ae",
  storageBucket: "gadget-heaven-495ae.firebasestorage.app",
  messagingSenderId: "220709759615",
  appId: "1:220709759615:web:3914637e3441b159532d4a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
