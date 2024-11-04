import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StudentDashboard from '../screens/student/StudentDashboard';
import StudentNotificationsScreen from '../screens/student/StudentNotificationsScreen';
import StudentMessagesScreen from '../screens/student/StudentMessagesScreen';
import StudentProfileScreen from '../screens/student/StudentProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

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

export default StudentTabNavigator;
