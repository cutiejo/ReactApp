import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Studentmessages = [
  { id: '1', text: 'Hello!', isSender: false },
  { id: '2', text: 'Hi there!', isSender: true },
  { id: '3', text: 'How are you?', isSender: false },
  { id: '4', text: 'Good, and you?', isSender: true },
];

const StudentConversationScreen = ({ route }) => {
  const { name } = route.params;
  const [inputText, setInputText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.isSender ? styles.senderBubble : styles.receiverBubble]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton}>
          <Icon name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
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
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
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
  },
});

export default StudentConversationScreen;
