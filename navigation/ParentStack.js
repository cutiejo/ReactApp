import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ParentTabNavigator from './ParentTabNavigator';  // Assuming you have this

const Stack = createStackNavigator();

function ParentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ParentDashboard" component={ParentTabNavigator} options={{ headerShown: false }} />
      {/* Add other parent screens here */}
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

export default ParentStack;
