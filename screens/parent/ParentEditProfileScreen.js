import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ParentEditProfileScreen = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State to control the modal visibility
  const [fullName, setFullName] = useState('John Vic');
  const [email, setEmail] = useState('john@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('+1234567890');
  const [linkedStudents, setLinkedStudents] = useState('Joshua Vic, Grade 4, Section B');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const handleSaveChanges = () => {
    setModalVisible(true); // Show the modal when Save Changes is clicked
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.profileImageContainer}>
          <Icon name="account-circle" size={80} color="#ccc" />
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
        />

        <Text style={styles.label}>Linked Students</Text>
        <TextInput
          style={styles.input}
          placeholder="Linked Students"
          value={linkedStudents}
          editable={false} // Disable editing for linked students
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="**********"
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon
              name={isPasswordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Update Success */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="check-circle" size={64} color="#137e5e" />
            <Text style={styles.modalTitle}>Update Success</Text>
            <Text style={styles.modalMessage}>Profile Successfully Updated</Text>
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    elevation: 2,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#757575',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingRight: 10,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  saveButton: {
    backgroundColor: '#137e5e',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#137e5e',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ParentEditProfileScreen;
