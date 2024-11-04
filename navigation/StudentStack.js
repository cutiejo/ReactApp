import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StudentTabNavigator from './StudentTabNavigator';  // Assuming you have this

const Stack = createStackNavigator();

function StudentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StudentDashboard" component={StudentTabNavigator} options={{ headerShown: false }} />
      {/* Add other student screens here */}
      <Stack.Screen name="StudentMenuBarScreen" component={StudentMenuBarScreen} />
      <Stack.Screen name="StudentAttendanceScreen" component={StudentAttendanceScreen} />
      <Stack.Screen name="StudentTimesheetScreen" component={StudentTimesheetScreen} />
      <Stack.Screen name="StudentAnnouncementsScreen" component={StudentAnnouncementsScreen} />
      <Stack.Screen name="StudentAnnouncementDetail" component={StudentAnnouncementDetailScreen} />
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

export default StudentStack;
