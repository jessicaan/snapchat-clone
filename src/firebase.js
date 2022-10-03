import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApPcWXWuhhTfj6OTxyrGhQgZX8ASRisx0",
  authDomain: "snapshot-clone-6d546.firebaseapp.com",
  projectId: "snapshot-clone-6d546",
  storageBucket: "snapshot-clone-6d546.appspot.com",
  messagingSenderId: "1070405936016",
  appId: "1:1070405936016:web:3e17fd7038a020c2cec915",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = getStorage(firebaseApp);
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
