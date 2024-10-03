import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StudentChangePasswordScreen = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleChangePassword = () => {
    // Logic to change the password goes here
    setModalVisible(true); // Simulating success for modal
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Custom Header with Title */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      {/* Password Form */}
      <Text style={styles.label}>Old Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Old password"
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry={!isOldPasswordVisible}
        />
        <TouchableOpacity onPress={() => setOldPasswordVisible(!isOldPasswordVisible)}>
          <Icon name={isOldPasswordVisible ? 'eye' : 'eye-off'} size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>New Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="New password"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={!isNewPasswordVisible}
        />
        <TouchableOpacity onPress={() => setNewPasswordVisible(!isNewPasswordVisible)}>
          <Icon name={isNewPasswordVisible ? 'eye' : 'eye-off'} size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!isConfirmPasswordVisible}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}>
          <Icon name={isConfirmPasswordVisible ? 'eye' : 'eye-off'} size={24} color="#888" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>

      {/* Success Modal */}
      <Modal visible={isModalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Icon name="check-circle" size={60} color="#137e5e" />
            <Text style={styles.modalTitle}>Password Updated</Text>
            <Text style={styles.modalMessage}>Password Successfully Updated</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingRight: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 12,
  },
  button: {
    backgroundColor: '#137e5e',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#137e5e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StudentChangePasswordScreen;
