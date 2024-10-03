import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ParentDashboard = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Parent Dashboard</Text>
      </View>

      {/* Overview Section */}
      <View style={styles.overviewSection}>
        <Text style={styles.overviewText}>Welcome, Parent!</Text>
        <Text style={styles.subText}>Here’s a quick overview of your child’s status:</Text>
      </View>

      {/* Dashboard Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AttendanceScreen')}
        >
          <Image source={require('../assets/attendance.png')} style={styles.iconImage} />
          <Text style={styles.menuText}>Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('AnnouncementsScreen')}
        >
          <Image source={require('../assets/announcement.png')} style={styles.iconImage} />
          <Text style={styles.menuText}>Announcements</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('MessagesScreen')}
        >
          <Image source={require('../assets/message.png')} style={styles.iconImage} />
          <Text style={styles.menuText}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <Image source={require('../assets/settings.png')} style={styles.iconImage} />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#1F5D50',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  overviewSection: {
    marginBottom: 20,
  },
  overviewText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Add elevation for Android
    elevation: 3,
  },
  iconImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  menuText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#137e5e',
    textAlign: 'center',
  },
});

export default ParentDashboard;
