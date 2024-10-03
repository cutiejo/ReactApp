import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import StudentDashboardScreen from './screens/StudentDashboardScreen';
import NotificationScreen from './screens/NotificationScreen';
import AnnouncementsScreen from './screens/AnnouncementsScreen';
import MenuBarScreen from './screens/MenuBarScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={StudentDashboardScreen}
        options={{ tabBarIcon: ({ color }) => (<Icon name="home-outline" size={24} color={color} />) }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{ tabBarIcon: ({ color }) => (<Icon name="bell-outline" size={24} color={color} />) }}
      />
      <Tab.Screen
        name="Messages"
        component={AnnouncementsScreen}
        options={{ tabBarIcon: ({ color }) => (<Icon name="message-outline" size={24} color={color} />) }}
      />
      <Tab.Screen
        name="Profile"
        component={MenuBarScreen}
        options={{ tabBarIcon: ({ color }) => (<Icon name="account-outline" size={24} color={color} />) }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
