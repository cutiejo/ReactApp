import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function StudentDashboard() {
  const navigation = useNavigation();

  // State for search input and filtered announcements
  const [searchText, setSearchText] = useState('');
  const [announcements, setAnnouncements] = useState([
    { id: 1, text: 'WE WILL LAUNCH SOON!', image: require('../../assets/school_building.png') },
    { id: 2, text: 'Are you ready to go back to school?', image: require('../../assets/school_kids.png') },
    { id: 3, text: 'BALIK SKWELA SY 2024-2025', image: require('../../assets/school_building.png') },
  ]);

  // Filtered announcements based on search input
  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.navigate('StudentMenuBarScreen')}>
            <Icon name="menu" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('StudentSettingsScreen')}>
            <Icon name="cog-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.greetingText}>Hi, Student Name</Text>
        <Text style={styles.subText}>Have a nice day!</Text>
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

      {/* Quick Access Icons */}
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

      {/* Announcement Section */}
      <ScrollView style={styles.announcementContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.announcementTitle}>Announcements</Text>
        {filteredAnnouncements.map((announcement) => (
          <TouchableOpacity
            key={announcement.id}
            onPress={() => navigation.navigate('StudentAnnouncementsScreen')}
            style={styles.announcementCard}
          >
            <Image source={announcement.image} style={styles.announcementImage} />
            <Text style={styles.announcementText}>{announcement.text}</Text>
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
  announcementContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
