import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StudentDashboard() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [studentName, setStudentName] = useState('');

  // Fetch announcements from the backend
  useEffect(() => {
    fetch('http://192.168.1.12/Capstone/api/get_announcements.php')
      .then((response) => response.json())
      .then((data) => {
        const sortedAnnouncements = data.sort((a, b) => new Date(b.posting_date) - new Date(a.posting_date));
        setAnnouncements(sortedAnnouncements.slice(0, 3));
      })
      .catch((error) => console.error('Error fetching announcements:', error));
  }, []);

  // Retrieve student name from AsyncStorage on component mount
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');

        console.log("Retrieved session from AsyncStorage:", session); // Debug log

        const user = session ? JSON.parse(session) : null;

        // Check if the user session and user_id are correctly set
        if (user && user.user_id && user.role === 'student') {


          const response = await fetch(`http://192.168.1.12/Capstone/api/get_profile.php?user_id=${user.user_id}`);
          const data = await response.json();

          if (data.status) {
            setStudentName(data.student.full_name);
          } else {
            console.error("API Error:", data.message);
            Alert.alert("Error", "Student not found in the database. Please check your profile.");
          }
        } else {
          console.error("User session or user ID missing. Session data:", user);
          Alert.alert("Error", "User session not found or user ID is missing.");
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        Alert.alert("Error", "Unable to fetch student information. Please try again later.");
      }
    };

    fetchStudentData();
  }, []);

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.navigate('StudentMenuBarScreen')}>
            <Icon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('StudentSettingsScreen')}>
            <Icon name="cog-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.greetingText}>Hi, {studentName || 'Student'}</Text>
        <Text style={styles.subText}>Have a nice day!</Text>
      </View>

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

      <View style={styles.quickAccessMenu}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('StudentAttendanceScreen')}>
          <View style={styles.iconBg}>
            <Icon name="calendar-check-outline" size={30} color="#137e5e" />
          </View>
          <Text style={styles.iconText}>Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('StudentTimesheetScreen')}>
          <View style={styles.iconBg}>
            <Icon name="clipboard-text-outline" size={30} color="#137e5e" />
          </View>
          <Text style={styles.iconText}>Timesheet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('StudentMenuBarScreen')}>
          <View style={styles.iconBg}>
            <Icon name="dots-horizontal" size={30} color="#137e5e" />
          </View>
          <Text style={styles.iconText}>More..</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.announcementHeader}>
        <Text style={styles.announcementTitle}>Announcements</Text>
        <TouchableOpacity onPress={() => navigation.navigate('StudentAnnouncementsScreen')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.announcementContainer} showsVerticalScrollIndicator={false}>
        {filteredAnnouncements.map((announcement) => (
          <TouchableOpacity
            key={announcement.id}
            onPress={() => navigation.navigate('StudentAnnouncementDetail', {
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
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
  quickAccessMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  menuButton: {
    alignItems: 'center',
  },
  iconBg: {
    backgroundColor: '#EEF5F3',
    padding: 15,
    borderRadius: 10,
  },
  iconText: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
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
  seeAllText: {
    color: '#137e5e',
    fontSize: 16,
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
