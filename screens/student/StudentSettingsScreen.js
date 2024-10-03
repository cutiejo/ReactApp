import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StudentSettingsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    // Implement the actual logout logic here, e.g., clearing user session data
    setModalVisible(false);
    // Redirect to login screen or other appropriate action
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => navigation.navigate('StudentProfileScreen')}>
          <Image
            source={require('../../assets/profile_placeholder.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <TouchableOpacity onPress={() => navigation.navigate('StudentProfileScreen')}>
            <Text style={styles.profileName}>John Vic</Text>
            <Text style={styles.profileEmail}>john@gmail.com</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('StudentEditProfileScreen')} style={styles.editProfileButton}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
            <Icon name="chevron-right" size={18} color="#137e5e" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Settings Options */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => navigation.navigate('StudentProfileScreen')}
        >
          <Icon name="account-outline" size={24} color="#137e5e" />
          <Text style={styles.settingsText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => navigation.navigate('StudentChangePasswordScreen')}
        >
          <Icon name="lock-outline" size={24} color="#137e5e" />
          <Text style={styles.settingsText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => navigation.navigate('StudentAboutScreen')}
        >
          <Icon name="information-outline" size={24} color="#137e5e" />
          <Text style={styles.settingsText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => navigation.navigate('ParentsInformationScreen')}
        >
          <Icon name="account-group-outline" size={24} color="#137e5e" />
          <Text style={styles.settingsText}>Parents Information</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsItem}
          onPress={() => setModalVisible(true)} // Show logout modal
        >
          <Icon name="logout" size={24} color="#137e5e" />
          <Text style={styles.settingsText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Log out</Text>
            <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.logoutConfirmButton]}
                onPress={handleLogout}
              >
                <Text style={styles.logoutText}>Log out</Text>
              </TouchableOpacity>
            </View>
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#757575',
  },
  editProfileText: {
    fontSize: 14,
    color: '#137e5e',
  },
  settingsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsText: {
    marginLeft: 15,
    fontSize: 16,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    borderColor: '#137e5e',
    borderWidth: 1,
  },
  logoutConfirmButton: {
    backgroundColor: '#137e5e',
  },
  cancelText: {
    color: '#137e5e',
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StudentSettingsScreen;
