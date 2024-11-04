import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Pressable, ScrollView, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const StudentEditProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [profile, setProfile] = useState({
    user_id: '',
    full_name: '',
    address: '',
    guardian: '',
    parent_full_name: '', // New field for parent name
    sex: '',
    birth_date: '',
    lrn: '',
    rfid_uid: '',
    email: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        const user = session ? JSON.parse(session) : null;

        if (user && user.user_id) {
          const response = await axios.get('http://192.168.1.12/Capstone/api/get_profile.php', {
            params: { user_id: user.user_id },
          });

          if (response.data.status) {
            const studentData = response.data.student;
            setProfile({ ...profile, ...studentData });
            setProfileImage(
              studentData.image
                ? { uri: `http://192.168.1.12/Capstone/${studentData.image}` }
                : require('../../assets/profile_placeholder.png')
            );
          } else {
            Alert.alert("Error", response.data.message || "Profile data not found.");
          }
        } else {
          Alert.alert("Error", "User session not found. Please log in again.");
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "Failed to retrieve profile information.");
      }
    };

    fetchProfile();
  }, []);

  const handleSaveChanges = async () => {
    const formData = new FormData();
    formData.append('user_id', profile.user_id);
    formData.append('full_name', profile.full_name);
    formData.append('address', profile.address);
    formData.append('birth_date', profile.birth_date);
    formData.append('parent_full_name', profile.parent_full_name); // Send parent name to the API
    formData.append('sex', profile.sex);

    if (profileImage && profileImage.uri) {
      formData.append('image', {
        uri: profileImage.uri,
        name: `profile_${profile.user_id}.jpg`,
        type: 'image/jpeg',
      });
    }

    try {
      const response = await axios.post('http://192.168.1.12/Capstone/api/update_student.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status) {
        setModalVisible(true);
      } else {
        Alert.alert("Error", response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to save profile changes.");
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "Sorry, we need camera roll permissions to make this work!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage({ uri: result.uri });
      }
    } catch (error) {
      console.error("Image Picker Error:", error);
      Alert.alert("Error", "Failed to open image picker.");
    }
  };

  const handleNonEditableField = (fieldName) => {
    Alert.alert("Non-Editable Field", `${fieldName} cannot be changed. Please contact admin.`);
  };

  const handleDateConfirm = (date) => {
    setDatePickerVisibility(false);
    setProfile({ ...profile, birth_date: date.toISOString().split('T')[0] });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity onPress={pickImage}>
          <View style={styles.profileImageContainer}>
            <Image
              source={profileImage || require('../../assets/profile_placeholder.png')}
              style={styles.profileImage}
            />
            <Icon name="camera-plus" size={24} color="#fff" style={styles.cameraIcon} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={profile.full_name}
          onChangeText={(text) => setProfile({ ...profile, full_name: text })}
        />

        

        <Text style={styles.label}>LRN</Text>
        <TextInput
          style={[styles.input, styles.nonEditable]}
          value={profile.lrn}
          editable={false}
          onPressIn={() => handleNonEditableField("LRN")}
        />

        <Text style={styles.label}>RFID Number</Text>
        <TextInput
          style={[styles.input, styles.nonEditable]}
          value={profile.rfid_uid}
          editable={false}
          onPressIn={() => handleNonEditableField("RFID Number")}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.nonEditable]}
          value={profile.email}
          editable={false}
          onPressIn={() => handleNonEditableField("Email")}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setDatePickerVisibility(true)}>
          <TextInput
            style={styles.input}
            value={profile.birth_date}
            placeholder="Select Date"
            editable={false}
          />
          <Icon name="calendar" size={20} color="#757575" style={styles.dateIcon} />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={profile.address}
          onChangeText={(text) => setProfile({ ...profile, address: text })}
        />

       <Text style={styles.label}>Guardian</Text>
        <TextInput
          style={[styles.input, styles.nonEditable]}
          value={profile.parent_full_name}
          onChangeText={(text) => setProfile({ ...profile, parent_full_name: text })}
          editable={false}
          onPressIn={() => handleNonEditableField("Registered Parent")}
        />
          
      

        {/* Gender Selection */}
        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity 
            onPress={() => setProfile({ ...profile, sex: 'male' })} 
            style={[
              styles.genderOption, 
              profile.sex === 'male' && styles.genderOptionSelected
            ]}
          >
            <Icon name={profile.sex === 'male' ? "radiobox-marked" : "radiobox-blank"} size={20} color="#137e5e" />
            <Text style={styles.genderLabel}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setProfile({ ...profile, sex: 'female' })} 
            style={[
              styles.genderOption, 
              profile.sex === 'female' && styles.genderOptionSelected
            ]}
          >
            <Icon name={profile.sex === 'female' ? "radiobox-marked" : "radiobox-blank"} size={20} color="#137e5e" />
            <Text style={styles.genderLabel}>Female</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>

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
    marginBottom: 20,
    position: 'relative',
    borderWidth: 3,
    borderColor: '#137e5e',
    borderRadius: 55,
    padding: 5,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: -5,
    backgroundColor: '#137e5e',
    borderRadius: 15,
    padding: 4,
  },
  form: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#757575',
  },
  dateInput: {
    position: 'relative',
  },
  dateIcon: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
  },
  nonEditable: {
    backgroundColor: '#f0f0f0',
    color: '#999',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  genderOptionSelected: {
    backgroundColor: '#f0f0f0', // Background for selected gender
    borderRadius: 5,
  },
  genderLabel: {
    marginLeft: 5,
    fontSize: 16,
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

export default StudentEditProfileScreen;
