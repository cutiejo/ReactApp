import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ParentDashboard = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [parentName, setParentName] = useState('');

  // Fetch announcements from the backend
  useEffect(() => {
    axios.get('http://192.168.1.12/Capstone/api/get_announcements.php')
      .then((response) => {
        const sortedAnnouncements = response.data.sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date));
        setAnnouncements(sortedAnnouncements.slice(0, 3));
      })
      .catch((error) => console.error('Error fetching announcements:', error));
  }, []);

  // Retrieve parent name from AsyncStorage on component mount
  useEffect(() => {
    const fetchParentData = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        console.log("Session raw data:", session);
  
        // Check if session data exists
        if (session) {
          const user = JSON.parse(session);
          console.log("Parsed user session:", user);
  
          // Check for correct structure and role of the user
          if (user && user.user_id && user.role === 'parent') {
            console.log(`Using dynamic user_id: ${user.user_id} to fetch parent profile`);
  
            // Make the API call with the dynamic user_id
            const response = await axios.get(`http://192.168.1.12/Capstone/api/get_profile_parent.php?user_id=${user.user_id}`);
            const data = response.data;
  
            console.log("API response data:", data);
  
            // Check for correct data structure and parent details
            if (data.status && data.parent) {
              setParentName(data.parent.full_name);
              console.log("Parent full name successfully set to:", data.parent.full_name);
            } else {
              console.error("API returned error or no parent data found:", data.message || "Parent profile not found.");
              Alert.alert("Error", data.message || "Parent profile not found.");
            }
          } else {
            console.error("User session is invalid or missing user_id/role for parent");
            Alert.alert("Error", "User session not found or user ID is missing.");
          }
        } else {
          console.error("No session data found in AsyncStorage");
          Alert.alert("Error", "No session data found.");
        }
      } catch (error) {
        console.error("Error fetching parent data:", error);
        Alert.alert("Error", "Unable to fetch parent information. Please try again later.");
      }
    };
  
    fetchParentData();
  }, []);
  
  
  
  

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.navigate('ParentMenuBarScreen')}>
            <Icon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ParentSettingsScreen')}>
            <Icon name="cog-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.greetingText}>Hi, {parentName || 'Parent'}</Text>
        <Text style={styles.subText}>Stay updated with your child's progress</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={25} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>

      {/* Overview Cards */}
      <View style={styles.overviewContainer}>
        <View style={styles.overviewCard}>
          <Icon name="calendar-month" size={40} color="#2196F3" />
          <Text style={styles.overviewNumber}>50</Text>
          <Text style={styles.overviewLabel}>No. of School Days</Text>
        </View>
        <View style={styles.overviewCard}>
          <Icon name="check-circle" size={40} color="#4CAF50" />
          <Text style={styles.overviewNumber}>22</Text>
          <Text style={styles.overviewLabel}>Days Present</Text>
        </View>
        <View style={styles.overviewCard}>
          <Icon name="close-circle" size={40} color="#F44336" />
          <Text style={styles.overviewNumber}>3</Text>
          <Text style={styles.overviewLabel}>Days Absent</Text>
        </View>
        <View style={styles.overviewCard}>
          <Icon name="clock-outline" size={40} color="#FF9800" />
          <Text style={styles.overviewNumber}>5</Text>
          <Text style={styles.overviewLabel}>Late Arrivals</Text>
        </View>
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ParentNotificationsScreen')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.notificationCard} onPress={() => navigation.navigate('ParentNotificationsScreen')}>
          <Icon name="bell-outline" size={30} color="#137e5e" />
          <View style={styles.notificationTextContainer}>
            <Text style={styles.notificationText}>Attendance Alert: Absent on Sept 24</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Announcements Section */}
      <View style={styles.announcementHeader}>
        <Text style={styles.announcementTitle}>Announcements</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ParentAnnouncementsScreen')}>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.announcementContainer}>
        {filteredAnnouncements.map((announcement) => (
          <TouchableOpacity
            key={announcement.id}
            onPress={() => navigation.navigate('ParentAnnouncementDetail', {
              title: announcement.title,
              content: announcement.content,
              posting_date: announcement.posting_date,
              image: announcement.image
            })}
            style={styles.announcementCard}
          >
            <Image source={{ uri: `http://192.168.1.12/Capstone/uploads/${announcement.image}` }} style={styles.announcementImage} />
            <Text style={styles.announcementText}>{announcement.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#1F5D50',
    paddingHorizontal: 20,
    paddingVertical: 35,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 40,
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10,
    marginTop: -15,
  },
  searchInput: {
    marginLeft: 10,
    color: '#000',
    flex: 1,
  },
  overviewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  overviewCard: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    elevation: 2,
    marginBottom: 15,
  },
  overviewNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllText: {
    fontSize: 14,
    color: '#137e5e',
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
  },
  notificationTextContainer: {
    marginLeft: 10,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  announcementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  announcementContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  announcementCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 20,
  },
  announcementImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  announcementText: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ParentDashboard;
