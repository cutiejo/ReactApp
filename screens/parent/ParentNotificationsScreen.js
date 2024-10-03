import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';

const notificationsData = [
  { id: '1', icon: require('../../assets/sv_logo.png'), title: 'Testing.', date: '24 Feb' },
  { id: '2', icon: require('../../assets/google-icon.png'), title: 'Sample Notification only.', date: '15 Jan' },
];

const ParentNotificationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity onPress={() => alert('Marked as Read')}>
          <Text style={styles.markReadText}>Mark as Read</Text>
        </TouchableOpacity>
      </View>

      {/* Notification List */}
      <FlatList
        data={notificationsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.notification}>
            <Image source={item.icon} style={styles.icon} />
            <View style={styles.notificationInfo}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 60, // Adjusted margin for a compact layout
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b3b3b',
  },
  markReadText: {
    fontSize: 16,
    color: '#e63946',
    marginTop: 70,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f4f4', // Light grey background for each notification
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
});

export default ParentNotificationScreen;
