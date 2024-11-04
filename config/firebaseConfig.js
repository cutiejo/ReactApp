import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase.database();
