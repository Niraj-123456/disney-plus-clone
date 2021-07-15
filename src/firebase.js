import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA9BnlX96fMf7XiUVCFRsoQzG8DGERJkeY", // Auth / General Use
  appId: "1:37918794208:web:dbe9842dfe1dda522a4b85", // General Use
  projectId: "disneyplus-clone-a33d5", // General Use
  authDomain: "disneyplus-clone-a33d5.firebaseapp.com", // Auth with popup/redirect
  storageBucket: "disneyplus-clone-a33d5.appspot.com", // Storage
  messagingSenderId: "37918794208", // Cloud Messaging
  measurementId: "G-DRVLJKWRWG", // Analytics
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
