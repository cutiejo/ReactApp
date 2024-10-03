import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { fetchStudents, addStudent } from '../services/api';
import StudentItem from '../components/StudentItem';

const StudentsScreen = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [rfid, setRfid] = useState('');
  const [phone, setPhone] = useState('');
  const [lrn, setLrn] = useState('');

  useEffect(() => {
    const loadStudents = async () => {
      const students = await fetchStudents();
      setStudents(students);
    };

    loadStudents();
  }, []);

  const handleAddStudent = async () => {
    const newStudent = { name, rfid, phone, lrn };
    try {
      await addStudent(newStudent);
      setStudents([...students, newStudent]);
      setName('');
      setRfid('');
      setPhone('');
      setLrn('');
      Alert.alert('Success', 'Student added successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to add student');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Students</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="RFID"
        value={rfid}
        onChangeText={setRfid}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="LRN"
        value={lrn}
        onChangeText={setLrn}
      />
      <Button title="Add Student" onPress={handleAddStudent} />
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <StudentItem student={item} />}
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

export default StudentsScreen;
