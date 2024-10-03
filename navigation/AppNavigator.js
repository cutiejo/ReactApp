import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Importing screens
import ExploreScreen from '../screens/ExploreScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import StudentDashboard from '../screens/student/StudentDashboard';
import ParentDashboard from '../screens/parent/ParentDashboard';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerificationSentScreen from '../screens/VerificationSentScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

// Student Screens
import StudentNotificationsScreen from '../screens/student/StudentNotificationsScreen';
import StudentMessagesScreen from '../screens/student/StudentMessagesScreen';
import StudentProfileScreen from '../screens/student/StudentProfileScreen';
import StudentAnnouncementsScreen from '../screens/student/StudentAnnouncementsScreen';
import StudentMenuBarScreen from '../screens/student/StudentMenuBarScreen';
import StudentChangePasswordScreen from '../screens/student/StudentChangePasswordScreen';
import StudentAboutScreen from '../screens/student/StudentAboutScreen';
import StudentContactScreen from '../screens/student/StudentContactScreen';
import StudentSettingsScreen from '../screens/student/StudentSettingsScreen';
import StudentAttendanceScreen from '../screens/student/StudentAttendanceScreen';
import StudentTimesheetScreen from '../screens/student/StudentTimesheetScreen';
import StudentSchoolCalendarScreen from '../screens/student/StudentSchoolCalendarScreen';
import StudentEditProfileScreen from '../screens/student/StudentEditProfileScreen';
import ParentsInformationScreen from '../screens/student/StudentParentsInformationScreen';
import StudentConversationScreen from '../screens/student/StudentConversationScreen';


// Parent Screens
import ParentNotificationsScreen from '../screens/parent/ParentNotificationsScreen';
import ParentMessagesScreen from '../screens/parent/ParentMessagesScreen';
import ParentProfileScreen from '../screens/parent/ParentProfileScreen';
import ParentAttendanceScreen from '../screens/parent/ParentAttendanceScreen';
import ParentMenuBarScreen from '../screens/parent/ParentMenuBarScreen';
import ParentChildInfoScreen from '../screens/parent/ParentChildInfoScreen';
import ParentEditProfileScreen from '../screens/parent/ParentEditProfileScreen';
import ParentSettingsScreen from '../screens/parent/ParentSettingsScreen';
import ParentAnnouncementsScreen from '../screens/parent/ParentAnnouncementsScreen';
import ParentSchoolCalendarScreen from '../screens/parent/ParentSchoolCalendarScreen';
import ParentChangePasswordScreen from '../screens/parent/ParentChangePasswordScreen';
import ParentAboutScreen from '../screens/parent/ParentAboutScreen';




// Stack and Tab navigator initialization
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Creating the bottom tab navigator for Student Dashboard
function StudentTabNavigator() {
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
        component={StudentDashboard}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={StudentNotificationsScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="bell-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={StudentMessagesScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="message-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={StudentProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="account-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

// Creating the bottom tab navigator for Parent Dashboard
function ParentTabNavigator() {
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
        component={ParentDashboard}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={ParentNotificationsScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="bell-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={ParentMessagesScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="message-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ParentProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="account-outline" size={24} color={color} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

// Creating the student stack navigator
function StudentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StudentDashboard" component={StudentTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="StudentMenuBarScreen" component={StudentMenuBarScreen} />
      <Stack.Screen name="StudentAttendanceScreen" component={StudentAttendanceScreen} />
      <Stack.Screen name="StudentTimesheetScreen" component={StudentTimesheetScreen} />
      <Stack.Screen name="StudentAnnouncementsScreen" component={StudentAnnouncementsScreen} />
      <Stack.Screen name="StudentSchoolCalendarScreen" component={StudentSchoolCalendarScreen} />
      <Stack.Screen name="StudentProfileScreen" component={StudentProfileScreen} />
      <Stack.Screen name="StudentEditProfileScreen" component={StudentEditProfileScreen} />
      <Stack.Screen name="StudentChangePasswordScreen" component={StudentChangePasswordScreen} />
      <Stack.Screen name="StudentAboutScreen" component={StudentAboutScreen} />
      <Stack.Screen name="ParentsInformationScreen" component={ParentsInformationScreen} />
      <Stack.Screen name="StudentContactScreen" component={StudentContactScreen} />
      <Stack.Screen name="StudentConversationScreen" component={StudentConversationScreen} />
      <Stack.Screen name="StudentSettingsScreen" component={StudentSettingsScreen} />
    </Stack.Navigator>
  );
}

// Creating the parent stack navigator
function ParentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ParentDashboard" component={ParentTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ParentChildInfoScreen" component={ParentChildInfoScreen} />
      <Stack.Screen name="ParentAttendanceScreen" component={ParentAttendanceScreen} />
      <Stack.Screen name="ParentMenuBarScreen" component={ParentMenuBarScreen} />
      <Stack.Screen name="ParentNotificationsScreen" component={ParentNotificationsScreen} />
      <Stack.Screen name="ParentMessagesScreen" component={ParentMessagesScreen} />
      <Stack.Screen name="ParentProfileScreen" component={ParentProfileScreen} />
      <Stack.Screen name="ParentSettingsScreen" component={ParentSettingsScreen} />
      <Stack.Screen name="ParentAnnouncementsScreen" component={ParentAnnouncementsScreen} />
      <Stack.Screen name="ParentEditProfileScreen" component={ParentEditProfileScreen} />
      <Stack.Screen name="ParentSchoolCalendarScreen" component={ParentSchoolCalendarScreen} />
      <Stack.Screen name="ParentChangePasswordScreen" component={ParentChangePasswordScreen} />
      <Stack.Screen name="ParentAboutScreen" component={ParentAboutScreen} />
      
    </Stack.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator() {
  const [userType, setUserType] = useState(null); // Track user type

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Explore">
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setUserType={setUserType} />}
        </Stack.Screen>
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Always include both stack navigators */}
        <Stack.Screen name="StudentStack" component={StudentStack} options={{ headerShown: false }} />
        <Stack.Screen name="ParentStack" component={ParentStack} options={{ headerShown: false }} />

        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="VerificationSent" component={VerificationSentScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles for Logout Modal
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    padding: 10,
    marginRight: 5,
    backgroundColor: '#fff',
    borderColor: '#137e5e',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelText: {
    color: '#137e5e',
    fontWeight: 'bold',
  },
  logoutButton: {
    flex: 1,
    padding: 10,
    marginLeft: 5,
    backgroundColor: '#137e5e',
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
