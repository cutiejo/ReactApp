import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';

const AnnouncementsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Announcement</Text>
      
      {/* Announcement Cards */}
      <TouchableOpacity style={styles.card}>
        <Image source={require('../assets/school_building.png')} style={styles.image} />
        <Text style={styles.cardText}>WE WILL LAUNCH SOON!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image source={require('../assets/school_kids.png')} style={styles.image} />
        <Text style={styles.cardText}>Are you ready to go back to school?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image source={require('../assets/sv_logo.png')} style={styles.image} />
        <Text style={styles.cardText}>SCHOOL LOGO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Image source={require('../assets/school_building.png')} style={styles.image} />
        <Text style={styles.cardText}>BALIK SKWELA SY 2024-2025</Text>
      </TouchableOpacity>
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

export default AnnouncementsScreen;
