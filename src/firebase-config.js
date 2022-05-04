import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//api key and project info
const firebaseConfig = {
    apiKey: "AIzaSyCAv57iYeoxSHDt5Nj3XFGwIwVIl-8e_Tw",
    authDomain: "whattowatch-1640178954180.firebaseapp.com",
    projectId: "whattowatch-1640178954180",
    storageBucket: "whattowatch-1640178954180.appspot.com",
    messagingSenderId: "316978128168",
    appId: "1:316978128168:web:fe9ccd92323f7943f51c1d",
    measurementId: "G-H0WEWLR34J"
  };

// Initialize firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);