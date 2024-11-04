import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ParentDashboard from '../screens/parent/ParentDashboard';
import ParentNotificationsScreen from '../screens/parent/ParentNotificationsScreen';
import ParentMessagesScreen from '../screens/parent/ParentMessagesScreen';
import ParentProfileScreen from '../screens/parent/ParentProfileScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

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

export default ParentTabNavigator;
