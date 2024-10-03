import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const messagesData = [
  { id: '1', name: 'Sample Message', preview: 'sample only', count: 9 },
  { id: '2', name: 'Sample Message', preview: 'sample only', count: 0 },
  { id: '3', name: 'Sample Message', preview: 'sample only', count: 2 },
  { id: '4', name: 'Sample Message', preview: 'sample only', count: 0 },
  { id: '5', name: 'Sample Message', preview: 'sample only', count: 0 },
];

const ParentMessagesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Message</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#888" />
        <TextInput
          placeholder="Search..."
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      {/* Messages List */}
      <FlatList
        data={messagesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageItem}
            onPress={() => navigation.navigate('ParentConversationScreen', { name: item.name })}
          >
            <Image source={require('../../assets/profile_placeholder.png')} style={styles.profileImage} />
            <View style={styles.messageInfo}>
              <Text style={styles.messageName}>{item.name}</Text>
              <Text style={styles.messagePreview}>{item.preview}</Text>
            </View>
            {item.count > 0 && (
              <View style={styles.messageCount}>
                <Text style={styles.messageCountText}>{item.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
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
  messageCount: {
    backgroundColor: '#137e5e',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageCountText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ParentMessagesScreen;
