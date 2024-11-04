import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Bottom tab navigator
const Tab = createBottomTabNavigator();

const StudentMenuBarScreen = ({ navigation }) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const openLogoutModal = () => setLogoutModalVisible(true);
  const closeLogoutModal = () => setLogoutModalVisible(false);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    closeLogoutModal();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={25} color="#888" />
        <TextInput placeholder="Search.." placeholderTextColor="#888" style={styles.searchInput} />
      </View>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('StudentAttendanceScreen')}>
          <Image source={require('../../assets/attendance.png')} style={styles.iconImage} />
          <Text style={styles.menuText}>ATTENDANCE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('StudentAnnouncementsScreen')}>
          <Image source={require('../../assets/announcement.png')} style={styles.iconImage} />
          <Text style={styles.menuText}>ANNOUNCEMENT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('StudentSchoolCalendarScreen')}>
          <Image source={require('../../assets/calendar.png')} style={styles.iconImage} />
          <Text style={styles.menuText}>SCHOOL CALENDAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('StudentTimesheetScreen')}>
          <Image source={require('../../assets/timesheet.png')} style={styles.iconImage} />
          <Text style={styles.menuText}>TIMESHEET</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('StudentSettingsScreen')}>
          <Image source={require('../../assets/settings.png')} style={styles.iconImage} />
          <Text style={styles.menuText}>SETTINGS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={openLogoutModal}>
          <Image source={require('../../assets/logout.png')} style={styles.iconImage} />
          <Text style={styles.menuText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Modal */}
      <Modal animationType="slide" transparent visible={logoutModalVisible} onRequestClose={closeLogoutModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Log out</Text>
            <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={closeLogoutModal}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Log out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Bottom Tab Navigation
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#137e5e',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: { paddingBottom: 10, height: 60 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={StudentMenuBarScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen} // Define this component separately
        options={{
          tabBarIcon: ({ color }) => <Icon name="bell-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen} // Define this component separately
        options={{
          tabBarIcon: ({ color }) => <Icon name="message-outline" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={StudentProfileScreen} // Define this component separately
        options={{
          tabBarIcon: ({ color }) => <Icon name="account-outline" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

// Define other screen components such as NotificationsScreen, MessagesScreen, and StudentProfileScreen
// ...

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: '#000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#ffff',
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
  },
  iconImage: {
    width: 60,
    height: 50,
    marginBottom: 10,
  },
  menuText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#137e5e',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#888',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 16,
  },
  logoutButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#137e5e',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default StudentMenuBarScreen;
