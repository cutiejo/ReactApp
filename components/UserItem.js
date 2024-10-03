import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserItem = ({ user }) => {
  return (
    <View style={styles.item}>
      <Text>ID: {user.id}</Text>
      <Text>Username: {user.username}</Text>
      <Text>Role: {user.role}</Text>
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

export default UserItem;
