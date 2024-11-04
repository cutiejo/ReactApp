import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { db } from './firebase'; // Ensure the path is correct
import { collection, getDocs } from 'firebase/firestore';

export default function App() {
  const [message, setMessage] = useState("Connecting to Firebase...");

  useEffect(() => {
    // Test Firebase connection by trying to access a Firestore collection
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "your_collection_name")); // Replace "your_collection_name" with an actual collection name in Firestore
        if (querySnapshot.empty) {
          setMessage("No data found in collection.");
        } else {
          setMessage("Firebase connection successful!");
        }
      } catch (error) {
        console.error("Error connecting to Firebase:", error);
        setMessage("Failed to connect to Firebase.");
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
