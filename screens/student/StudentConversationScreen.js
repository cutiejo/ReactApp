import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const StudentConversationScreen = ({ route }) => {
  const { name } = route.params; // name of the person in the conversation
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch conversation messages on component mount or when the 'name' changes
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axios.get('http://192.168.1.12/Capstone/api/conversation.php', {
          params: { name },
        });
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    };

    fetchConversation();
  }, [name]);

  // Function to handle sending a new message
  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = {
        text: inputText,
        isSender: true,
      };

      try {
        // Send message to the backend
        await axios.post('http://192.168.1.12/Capstone/api/conversation.php', {
          name,
          text: inputText,
          is_sender: 1, // 1 indicates the message is from the sender
        });

        // Update the messages list to display the new message
        setMessages([...messages, newMessage]);
        setInputText(''); // Clear the input field
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Text style={styles.title}>{name}</Text>
      
      {/* List of messages */}
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
      
      {/* Input and Send Button */}
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
