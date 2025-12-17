// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD1a6xOCPi9LM36Dxk9WTMozpxFpeiunWk",
    authDomain: "assignment-11-271f7.firebaseapp.com",
    projectId: "assignment-11-271f7",
    storageBucket: "assignment-11-271f7.firebasestorage.app",
    messagingSenderId: "787167390192",
    appId: "1:787167390192:web:4d49ad68ae5b215c3a5535"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;