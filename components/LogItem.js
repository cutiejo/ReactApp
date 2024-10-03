import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LogItem = ({ log }) => {
  return (
    <View style={styles.item}>
      <Text>ID: {log.id}</Text>
      <Text>Student Name: {log.name}</Text>
      <Text>RFID: {log.rfid}</Text>
      <Text>Timestamp: {log.timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default LogItem;
