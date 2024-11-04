import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StudentProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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

            // Construct the full image URL if the image field exists
            const profileImage = studentData.image 
              ? { uri: `http://192.168.1.12/Capstone/${studentData.image}` }
              : require('../../assets/profile_placeholder.png');

            setProfile({ ...studentData, profileImage });
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
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={profile?.profileImage || require('../../assets/profile_placeholder.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('StudentEditProfileScreen')}
          >
            <Icon name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.userName}>{profile?.full_name || 'N/A'}</Text>
      <Text style={styles.userGrade}>GRADE: {profile?.grade_level || 'N/A'}</Text>
      <Text style={styles.userSection}>SECTION: {profile?.section || 'N/A'}</Text>

      <View style={styles.profileDetails}>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Full Name</Text>
          <Text style={styles.profileValue}>{profile?.full_name || 'N/A'}</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>LRN</Text>
          <Text style={styles.profileValue}>{profile?.lrn || 'N/A'}</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>RFID Number</Text>
          <Text style={styles.profileValue}>{profile?.rfid_uid || 'N/A'}</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Email</Text>
          <Text style={styles.profileValue}>{profile?.email || 'N/A'}</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Date of Birth</Text>
          <Text style={styles.profileValue}>{profile?.birth_date || 'N/A'}</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Address</Text>
          <Text style={styles.profileValue}>{profile?.address || 'N/A'}</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Gender</Text>
          <Text style={styles.profileValue}>{profile?.sex || 'N/A'}</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Guardian</Text>
          <Text style={styles.profileValue}>{profile?.parent_full_name || 'No Parent Linked'}</Text>

        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#1F5D50',
    height: 160,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  profileImageContainer: {
    position: 'absolute',
    top: 90,
    alignSelf: 'center',
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: '#fff',
    borderWidth: 4,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#000',
    padding: 6,
    borderRadius: 50,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 70,
  },
  userGrade: {
    fontSize: 16,
    marginTop: 10,
    color: '#757575',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  userSection: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  profileDetails: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 15,
    marginHorizontal: 20,
    padding: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  profileLabel: {
    fontSize: 16,
    color: '#757575',
    fontWeight: 'bold',
  },
  profileValue: {
    fontSize: 16,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StudentProfileScreen;
