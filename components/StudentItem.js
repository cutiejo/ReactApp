import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StudentItem = ({ student }) => {
  return (
    <View style={styles.item}>
      <Text>ID: {student.id}</Text>
      <Text>Name: {student.name}</Text>
      <Text>RFID: {student.rfid}</Text>
      <Text>Phone: {student.phone}</Text>
      <Text>LRN: {student.lrn}</Text>
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

export default StudentItem;
