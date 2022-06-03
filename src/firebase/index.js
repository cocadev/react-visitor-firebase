
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { get, getDatabase, ref } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyC0aPSXZ3WTJZ6ZOyp_1KE-dHkpplnHT2Y",
    authDomain: "cocadev-81778.firebaseapp.com",
    databaseURL: "https://cocadev-81778-default-rtdb.firebaseio.com",
    projectId: "cocadev-81778",
    storageBucket: "cocadev-81778.appspot.com",
    messagingSenderId: "590135785261",
    appId: "1:590135785261:web:757d55ba30d13e489145a4"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authapp = getAuth(app)
const database = getDatabase(app)

export const firebaseApp = app
export const appAuth = authapp
export const realTimeDatabase = database