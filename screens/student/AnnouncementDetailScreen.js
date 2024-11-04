import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';

const AnnouncementDetailScreen = ({ route }) => {
  const { title, content, image } = route.params || {}; // Handle cases where route.params might be undefined
  const [loading, setLoading] = useState(true);

  return (
    <ScrollView style={styles.container}>
      {image ? (
        <Image
          source={{ uri: `http://192.168.1.12/Capstone/uploads/${image}` }}
          style={styles.image}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            Alert.alert('Image Load Error', 'Failed to load announcement image.');
          }}
        />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Image Not Available</Text>
        </View>
      )}
      {loading && <ActivityIndicator size="large" color="#137e5e" style={styles.loader} />}
      <Text style={styles.title}>{title || 'No Title'}</Text>
      <Text style={styles.content}>{content || 'No content available for this announcement.'}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: 100,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#888',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
});

export default AnnouncementDetailScreen;
