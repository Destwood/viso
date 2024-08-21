import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDcndabYe7yZZokFsaKh1HWJ0svYjAa5PI",
  authDomain: "viso-test-database.firebaseapp.com",
  projectId: "viso-test-database",
  storageBucket: "viso-test-database.appspot.com",
  messagingSenderId: "18156675544",
  appId: "1:18156675544:web:ad4be15420c12f729712ad",
  measurementId: "G-KLYR60Y82Z"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
