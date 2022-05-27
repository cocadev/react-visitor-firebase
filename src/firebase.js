// import firebase from 'firebase';
// import 'firebase/database';
// import 'firebase/auth';
// import 'firebase/storage';
// import 'firebase/functions';
// // import {
// //   signInWithEmailAndPassword,
// //   getAuth
// // } from 'firebase/auth'

// const config = {
//   // apiKey: "AIzaSyA3rJ1ZGRkIxR9hblnNhP2REDApGUXyQGk",
//   // authDomain: "my-project-4701e.firebaseapp.com",
//   // databaseURL: "https://my-project-4701e-default-rtdb.firebaseio.com",
//   // projectId: "my-project-4701e",
//   // storageBucket: "my-project-4701e.appspot.com",
//   // messagingSenderId: "978280351801",
//   // appId: "1:978280351801:web:c2f25430f317a53469e5e8",
//   // measurementId: "G-KM7SRKJRK5"


//   apiKey: "AIzaSyBtKbdc_s8EsR7PXFgzAEndyxUsH2p_d5Q",
//   authDomain: "demoreactjs-8c7ee.firebaseapp.com",
//   databaseURL: "https://demoreactjs-8c7ee-default-rtdb.firebaseio.com",
//   projectId: "demoreactjs-8c7ee",
//   storageBucket: "demoreactjs-8c7ee.appspot.com",
//   messagingSenderId: "35570629839",
//   appId: "1:35570629839:web:0f99b1abacb8c60dea4bba",
//   measurementId: "G-NLS6FGHWFW"

  
//   // apiKey: process.env.REACT_APP_FIRE_BASE_KEY,
//   // authDomain: process.env.REACT_APP_FIRE_BASE_AUTH_DOMAIN,
//   // databaseURL: process.env.REACT_APP_FIRE_BASE_DB_URL,
//   // projectId: process.env.REACT_APP_FIRE_BASE_PROJECT_ID,
//   // storageBucket: process.env.REACT_APP_FIRE_BASE_STORAGE_BUCKET,
//   // messagingSenderId: process.env.REACT_APP_FIRE_BASE_MESSAGING_SENDER_ID,
//   // appId: process.env.REACT_APP_FIRE_BASE_APP_ID,
//   // measurementId: process.env.REACT_APP_FIRE_BASE_MEASURMENT_ID,
// };

// firebase.initializeApp(config);
// firebase.database();
// firebase.storage();

// export { auth };
// export default firebase;

import firebase from 'firebase';

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
const x = firebase.initializeApp(firebaseConfig);
const authx = firebase.auth(x);
export { authx };
export default firebase;