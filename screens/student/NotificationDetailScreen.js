import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NotificationDetailScreen = ({ route }) => {
  // Extract the notification details from route params
  const { notification } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>

      {/* Notification message */}
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{notification.message}</Text>
      </View>

      {/* Notification details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Date:</Text>
        <Text style={styles.detailValue}>{new Date(notification.created_at).toLocaleString()}</Text>

        <Text style={styles.detailLabel}>Type:</Text>
        <Text style={styles.detailValue}>{notification.type || "General"}</Text>

        <Text style={styles.detailLabel}>Status:</Text>
        <Text style={[styles.detailValue, 
          { color: notification.status === 'read' ? '#4CAF50' : '#FF5722' }
        ]}>
          {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
        </Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  messageContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  message: {
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});

export default NotificationDetailScreen;
