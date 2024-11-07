import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Alert, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { db } from '../../config/firebase';
import { collection, doc, setDoc, addDoc, query, orderBy, onSnapshot, updateDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

const StudentConversationScreen = ({ route }) => {
  const { name, selectedFriendId, initialMessages, senderId, conversationId } = route.params;
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(initialMessages || []);
  let unsubscribe;

  useEffect(() => {
    const messagesQuery = query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const conversationMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(conversationMessages);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [conversationId]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.pop();
        return true;
      };

      const conversationRef = doc(db, "conversations", conversationId);
      updateDoc(conversationRef, { seen: true });
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => backHandler.remove();
    }, [])
  );

  const handleSend = async () => {
    const messageContent = inputText.trim();
    if (messageContent && selectedFriendId) {
      var message = inputText;
      setInputText('');
      const messagesRef = collection(db, 'conversations', conversationId, 'messages');

      const newMessage = {
        senderId,
        senderEmail: '',
        senderProfilePicUrl: 'https://www.mgp.net.au/wp-content/uploads/2023/05/150-1503945_transparent-user-png-default-user-image-png-png.png',
        text: messageContent,
        timestamp: new Date(),
        isSender: true,
      };

      try {
        await addDoc(messagesRef, newMessage);

        setMessages([...messages, newMessage]);

        updateOrCreateConversation(conversationId, messageContent);
      } catch (error) {
        console.error('Error sending message:', error);
        Alert.alert('Error', 'Failed to send message');
      }
    } else {
      Alert.alert("Error", "Please select a user to chat with and enter a message.");
    }
  };

  const updateOrCreateConversation = async (conversationId, lastMessage) => {
    const conversationRef = doc(db, 'conversations', conversationId);
    const conversationData = {
      userIds: [senderId, selectedFriendId],
      lastMessage: lastMessage,
      lastTimestamp: Date.now(),
      seen: false,
    };

    try {
      await setDoc(conversationRef, conversationData, { merge: true });
    } catch (error) {
      console.error('Error updating conversation:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <Text style={styles.title}>{name}</Text>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.isSender ? styles.senderBubble : styles.receiverBubble]}>
            <Text style={[styles.messageText, item.isSender ? styles.senderText : styles.receiverText]}>
              {item.text}
            </Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      {Platform.OS == 'ios' && <View style={{ height: 20 }} />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#137e5e',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '70%',
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
    fontSize: 16,
  },
  senderText: {
    color: '#fff',
  },
  receiverText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    marginTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#137e5e',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
});

export default StudentConversationScreen;
