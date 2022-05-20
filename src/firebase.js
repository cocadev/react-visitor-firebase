import firebase from "firebase";
const firebaseConfig = {
    // Your Credentials
    apiKey: "AIzaSyA3rJ1ZGRkIxR9hblnNhP2REDApGUXyQGk",
    authDomain: "my-project-4701e.firebaseapp.com",
    projectId: "my-project-4701e",
    storageBucket: "my-project-4701e.appspot.com",
    messagingSenderId: "978280351801",
    appId: "1:978280351801:web:c2f25430f317a53469e5e8",
    measurementId: "G-KM7SRKJRK5"
};
    
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
  
export default database;