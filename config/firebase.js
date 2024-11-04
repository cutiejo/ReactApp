import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyARVlrOu1mzfjwkzZRUCw8eHGafT_sLTgs",
  authDomain: "svmrfid.firebaseapp.com",
  databaseURL: "https://svmrfid-default-rtdb.firebaseio.com",
  projectId: "svmrfid",
  storageBucket: "svmrfid.firebasestorage.app",
  messagingSenderId: "1089576323565",
  measurementId: "G-3PN9Y0NVJD",
  appId: "1:1089576323565:web:b32d2b714695045065bfe4"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);