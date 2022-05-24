import { initializeApp } from "firebase-admin/app";
import { applicationDefault} from "firebase-admin/app";
// const admin = require('firebase-admin/app')
// import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase-admin/auth'

// import firebaseAdmin  from 'firebase-admin/app';
import serviceAccount from './json/my-project-4701e-firebase-adminsdk-w13r8-e94e3c7f5c.json';
import {
  GoogleAuthProvider,
  // getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCHRw5UGNeRYVFLYvLqFHK7iAzUJoaluW0",
//   authDomain: "digisic-visitor-pass.firebaseapp.com",
//   projectId: "digisic-visitor-pass",
//   storageBucket: "digisic-visitor-pass.appspot.com",
//   messagingSenderId: "423753356545",
//   appId: "1:423753356545:web:8acec5c04dafacde3e3700",
//   measurementId: "G-QTN7XTWPKL"
// };

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
// const app = initializeApp(firebaseConfig);
// const initializeApp = firebaseAdmin.initializeApp;
// const app =initializeApp({
//   credential: applicationDefault(),
//   projectId: serviceAccount.project_id,
// });
// const app = initializeApp({
//   // credential: initializeApp.credential.cert(serviceAccount),
//   credential: applicationDefault(),
//   databaseURL: "https://demoreactjs-8c7ee-default-rtdb.firebaseio.com"
// });
// import { getAuth } from "firebase-admin/auth";

// const app = initializeApp({
//   credential: initializeApp.credential.cert({
//     projectId: "demoreactjs-8c7ee",
//     clientEmail:"firebase-adminsdk-tnsfe@demoreactjs-8c7ee.iam.gserviceaccount.com",
//     privateKey: serviceAccount.private_key?.replace(/\\n/g, '\n'),
//   }),
// })
const app = initializeApp();

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"),{
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
   
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
