import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ParentProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={require('../../assets/profile_placeholder.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.editIcon}
            onPress={() => navigation.navigate('ParentEditProfileScreen')}
          >
            <Icon name="pencil" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* User Information */}
      <Text style={styles.userName}>John Vic</Text>
      <Text style={styles.userRelationship}>Relationship: Father</Text>

      {/* Profile Details */}
      <View style={styles.profileDetails}>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Full Name</Text>
          <Text style={styles.profileValue}>John Vic</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Email</Text>
          <Text style={styles.profileValue}>john@gmail.com</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Phone Number</Text>
          <Text style={styles.profileValue}>+1234567890</Text>
        </View>
        <View style={styles.profileRow}>
          <Text style={styles.profileLabel}>Linked Students</Text>
          <View style={styles.linkedStudentsContainer}>
            <Text style={styles.profileValue}>Joshua Vic</Text>
            <Text style={styles.linkedStudentDetails}>Grade 4, Section B</Text>
          </View>
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
    marginTop: 60,
  },
  userRelationship: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 20,
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
  },
  profileValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  linkedStudentsContainer: {
    alignItems: 'flex-end',
  },
  linkedStudentDetails: {
    fontSize: 14,
    color: '#666',
  },
});

export default ParentProfileScreen;
