import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_ID,
  appId: process.env.REACT_APP_FIREBASE_APPI_ID
};
/*
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const firebaseDB = app.firestore;
const auth = app.auth;
const storage = firebase.storage;

export { app , auth, firebaseDB, storage };
*/
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
//const firebaseDB = firebase.firestore()

export { app, storage  };

