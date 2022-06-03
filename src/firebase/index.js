
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { get, getDatabase, ref } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyA3rJ1ZGRkIxR9hblnNhP2REDApGUXyQGk",
    authDomain: "my-project-4701e.firebaseapp.com",
    databaseURL: "https://my-project-4701e-default-rtdb.firebaseio.com",
    projectId: "my-project-4701e",
    storageBucket: "my-project-4701e.appspot.com",
    messagingSenderId: "978280351801",
    appId: "1:978280351801:web:c2f25430f317a53469e5e8",
    measurementId: "G-KM7SRKJRK5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authapp = getAuth(app)
const database = getDatabase(app)

export const firebaseApp = app
export const appAuth = authapp
export const realTimeDatabase = database