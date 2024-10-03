import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Button title="View Attendance" onPress={() => navigation.navigate('Attendance')} />
      <Button title="View Notifications" onPress={() => navigation.navigate('Notifications')} />
      <Button title="View Logs" onPress={() => navigation.navigate('Logs')} />
      <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});
