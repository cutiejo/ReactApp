// services/messageHelper.js
import { addDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

// Function to send a message to Firestore
export const sendMessage = async (messageText, senderId) => {
  try {
    await addDoc(collection(db, 'messages'), {
      text: messageText,
      senderId: senderId,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error sending message: ", error);
  }
};

// Function to subscribe to messages from Firestore
export const subscribeToMessages = (setMessages) => {
  const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({ ...doc.data(), id: doc.id });
    });
    setMessages(messages);
  });

  return unsubscribe;
};
