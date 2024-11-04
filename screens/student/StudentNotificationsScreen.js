import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const StudentNotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        const user = session ? JSON.parse(session) : null;

        if (user && user.user_id) {
          fetchNotifications(user.user_id);
        } else {
          Alert.alert("Error", "User session not found. Please log in again.");
          navigation.replace('Login');
        }
      } catch (error) {
        console.error("Error retrieving user session:", error);
        Alert.alert("Error", "Failed to retrieve user session.");
      }
    };

    fetchUserNotifications();
  }, []);

  const fetchNotifications = async (user_id) => {
    try {
      const response = await axios.get('http://192.168.1.12/Capstone/api/get_notifications.php', {
        params: { user_id },
      });
      setNotifications(response.data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      Alert.alert("Error", "Failed to fetch notifications");
    }
  };

  const markAllAsRead = async () => {
    try {
      const session = await AsyncStorage.getItem('userSession');
      const user = session ? JSON.parse(session) : null;

      if (user && user.user_id) {
        await axios.post('http://192.168.1.12/Capstone/api/mark_notifications_as_read.php', {
          user_id: user.user_id,
        });
        Alert.alert("Success", "All notifications marked as read");
        fetchNotifications(user.user_id); // Refresh the notifications list
      }
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      Alert.alert("Error", "Failed to mark notifications as read");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.markReadText}>Mark as Read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notification}
            onPress={() => navigation.navigate('NotificationDetail', { notification: item })}
          >
            <Image source={require('../../assets/sv_logo.png')} style={styles.icon} />
            <View style={styles.notificationInfo}>
              <Text style={styles.notificationTitle}>{item.message}</Text>
              <Text style={styles.date}>{item.created_at}</Text>
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
    marginVertical: 60,
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
    backgroundColor: '#f4f4f4',
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

export default StudentNotificationScreen;
