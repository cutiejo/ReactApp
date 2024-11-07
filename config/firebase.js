// Import the Firebase and Firestore functions
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBesa9xkX61DZ-xQxsX6UEy0ZP8c7CNvms",
  authDomain: "chat-app-b2c25.firebaseapp.com",
  databaseURL: "https://chat-app-b2c25-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-b2c25",
  storageBucket: "chat-app-b2c25.firebasestorage.app",
  messagingSenderId: "17333985878",
  appId: "1:17333985878:web:6e83cbc7e786ba367791f7",
  measurementId: "G-0J951CGMHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore instance to use in other files
export { db };

export const createUserProfile = async (userId, userInfo) => {
  try {
    console.log("Creating user profile with data:", JSON.stringify(userInfo));
    const userRef = doc(db, "users", userId.toString());
    await setDoc(userRef, userInfo);
    console.log("User profile created successfully!");
  } catch (error) {
    console.error("Error creating user profile: ", error);
  }
};
