import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

const StudentAnnouncementsScreen = ({ navigation }) => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.1.12/Capstone/api/get_announcements.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAnnouncements(data);
        setLoading(false); // Stop loading indicator
      })
      .catch(error => {
        console.error('Error fetching announcements:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Announcements</Text>
      {announcements && announcements.length > 0 ? (
        announcements.map(announcement => (
          <TouchableOpacity
            key={announcement.id}
            style={styles.card}
            onPress={() => navigation.navigate('StudentAnnouncementDetail', {
              title: announcement.title,
              content: announcement.content,
              posting_date: announcement.posting_date,
              image: announcement.image
              })
            }
          >
            <Image
              source={{ uri: `http://192.168.1.12/Capstone/uploads/${announcement.image}` }}
              style={styles.image}
            />
            <Text style={styles.cardText}>{announcement.title}</Text>
          </TouchableOpacity>


        ))
      ) : (
        <Text>No announcements available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b3b3b',
    marginVertical: 20,
    textAlign: 'center',
  },
  card: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardText: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
});

export default StudentAnnouncementsScreen;
