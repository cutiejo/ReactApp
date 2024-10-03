import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const StudentAboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.paragraph}>
          This app is designed to manage student information, track attendance, and provide notifications. It streamlines school operations for students, parents, and teachers.
        </Text>
        <Text style={styles.paragraph}>
          Version: 1.0.0
        </Text>
        <Text style={styles.paragraph}>
          For support, contact us at support@schoolapp.com.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#1F5D50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  paragraph: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
});

export default StudentAboutScreen;
