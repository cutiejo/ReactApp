import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const StudentAnnouncementDetailScreen = ({ route }) => {
  const { title, content, image, posting_date } = route.params || {}; // Fallback to empty if undefined

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {image ? (
          <Image
            source={{ uri: `http://192.168.1.12/Capstone/uploads/${image}` }}
            style={styles.image}
          />
        ) : (
          <Text>No image available</Text>
        )}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title || 'No title available'}</Text>
          <Text style={styles.date}>
            Posted on: {posting_date ? posting_date : 'Date not available'}
          </Text>
          <Text style={styles.content}>{content || 'No content available'}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  content: {
    fontSize: 18,
    lineHeight: 28,
    color: '#34495e',
    textAlign: 'justify',
  },
});

export default StudentAnnouncementDetailScreen;
