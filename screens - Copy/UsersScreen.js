import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { fetchUsers, addUser } from '../services/api';
import UserItem from '../components/UserItem';

const UsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  useEffect(() => {
    const loadUsers = async () => {
      const users = await fetchUsers();
      setUsers(users);
    };

    loadUsers();
  }, []);

  const handleAddUser = async () => {
    const newUser = { username, password, role };
    try {
      await addUser(newUser);
      setUsers([...users, newUser]);
      setUsername('');
      setPassword('');
      setRole('user');
      Alert.alert('Success', 'User added successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to add user');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Role"
        value={role}
        onChangeText={setRole}
      />
      <Button title="Add User" onPress={handleAddUser} />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserItem user={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default UsersScreen;
