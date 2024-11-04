import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../config/firebase'; // Assuming firebase.js is in config folder
import { collection, addDoc, query, orderBy, onSnapshot, doc, setDoc } from 'firebase/firestore';

const StudentMessagesScreen = ({ navigation }) => {
  const [messagesData, setMessagesData] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [search, setSearch] = useState('');

  // Fetch conversations on component mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        const user = session ? JSON.parse(session) : null;

        if (user && user.user_id) {
          const conversationsQuery = query(
            collection(db, `users/${user.user_id}/conversations`),
            orderBy("lastMessageTimestamp", "desc")
          );
          onSnapshot(conversationsQuery, (snapshot) => {
            const conversationsData = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setConversations(conversationsData);
          });
        } else {
          Alert.alert("Error", "User session not found. Please log in again.");
          navigation.replace('Login');
        }
      } catch (error) {
        console.error("Error retrieving conversations:", error);
        Alert.alert("Error", "Failed to retrieve conversations.");
      }
    };

    fetchConversations();
  }, []);

  // Fetch messages in a selected conversation
  const fetchMessages = (receiver_id) => {
    const messagesQuery = query(
      collection(db, `conversations/${receiver_id}/messages`),
      orderBy("timestamp", "asc")
    );
    onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessagesData(messagesData);
    });
    setSelectedConversation(receiver_id);
  };

  // Send a new message
  const sendMessage = async () => {
    try {
      const session = await AsyncStorage.getItem('userSession');
      const user = session ? JSON.parse(session) : null;

      if (user && newMessage.trim()) {
        const messageData = {
          sender_id: user.user_id,
          message_content: newMessage,
          timestamp: new Date(),
        };

        await addDoc(collection(db, `conversations/${selectedConversation}/messages`), messageData);

        // Update the last message in the conversation for preview
        await setDoc(doc(db, `users/${user.user_id}/conversations`, selectedConversation), {
          last_message: newMessage,
          lastMessageTimestamp: new Date(),
        }, { merge: true });

        setNewMessage('');
      } else {
        Alert.alert("Error", "Please enter a message.");
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert("Error", "Failed to send message.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#888" />
        <TextInput 
          placeholder="Search..." 
          placeholderTextColor="#888" 
          style={styles.searchInput} 
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>

      {/* Display list of conversations */}
      <FlatList
        data={conversations.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageItem}
            onPress={() => fetchMessages(item.id)}
          >
            <Image source={require('../../assets/profile_placeholder.png')} style={styles.profileImage} />
            <View style={styles.messageInfo}>
              <Text style={styles.messageName}>{item.name}</Text>
              <Text style={styles.messagePreview}>{item.last_message}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Display messages for the selected conversation */}
      {selectedConversation && (
        <View style={styles.chatContainer}>
          <FlatList
            data={messagesData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={[styles.messageBubble, item.sender_id === user.user_id ? styles.senderBubble : styles.receiverBubble]}>
                <Text style={styles.messageText}>{item.message_content}</Text>
              </View>
            )}
          />

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type a message"
              value={newMessage}
              onChangeText={setNewMessage}
              style={styles.input}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Icon name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b3b3b',
    textAlign: 'center',
    marginVertical: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    borderColor: '#d3d3d3',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  messageInfo: {
    flex: 1,
  },
  messageName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  messagePreview: {
    fontSize: 14,
    color: '#888',
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '75%',
  },
  senderBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#137e5e',
  },
  receiverBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
  },
  messageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
  },
  input: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#137e5e',
    padding: 10,
    borderRadius: 20,
  },
});

export default StudentMessagesScreen;
