import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ParentsInformationScreen = () => {
  const [parentData, setParentData] = useState(null);

  useEffect(() => {
    const fetchParentInfo = async () => {
      try {
        const session = await AsyncStorage.getItem('userSession');
        const user = session ? JSON.parse(session) : null;

        if (user && user.user_id) {
          const response = await axios.get('http://192.168.1.12/Capstone/api/get_parents_info.php', {
            params: { user_id: user.user_id },
          });

          if (response.data.status) {
            setParentData(response.data.parents);
          } else {
            Alert.alert("Error", response.data.message || "Failed to load parents' information.");
          }
        } else {
          Alert.alert("Error", "User session not found. Please log in again.");
        }
      } catch (error) {
        console.error("Error fetching parents' info:", error);
        Alert.alert("Error", "Failed to load parents' information.");
      }
    };

    fetchParentInfo();
  }, []);

  if (!parentData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading parent information...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Parents Information</Text>
      </View>

      {/* Parent/Guardian Information */}
      <View style={styles.content}>
        {Object.keys(parentData).map((key) => {
          const guardian = parentData[key];
          return (
            <View key={key}>
              <View style={styles.sectionHeader}>
                <Icon name="account" size={24} color="#1F5D50" />
                <Text style={styles.sectionTitle}>{key.replace('_', ' ')}</Text>
              </View>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{guardian.name || 'N/A'}</Text>

              <Text style={styles.label}>Phone Number:</Text>
              <View style={styles.row}>
                <Icon name="phone" size={18} color="#137e5e" />
                <Text style={styles.value}>{guardian.phone || 'N/A'}</Text>
              </View>

              <Text style={styles.label}>Email:</Text>
              <View style={styles.row}>
                <Icon name="email" size={18} color="#137e5e" />
                <Text style={styles.value}>{guardian.email || 'N/A'}</Text>
              </View>

              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{guardian.address || 'N/A'}</Text>

              <View style={styles.divider} />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    backgroundColor: '#1F5D50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
});

export default ParentsInformationScreen;
