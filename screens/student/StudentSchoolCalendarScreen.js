import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const StudentSchoolCalendarScreen = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.12/Capstone/api/school-events');
        if (response.data.status) {
          setCalendarData(response.data.events);
          setFilteredData(response.data.events); // Initialize filtered data with full data
        } else {
          Alert.alert("Error", "Failed to load calendar events.");
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
        Alert.alert("Error", "Could not connect to the server.");
      }
    };

    fetchData();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'Holiday':
        return 'calendar-remove';
      case 'Event':
        return 'calendar-star';
      case 'Exam':
        return 'calendar-check';
      default:
        return 'calendar';
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'Holiday':
        return '#F44336';
      case 'Event':
        return '#FF9800';
      case 'Exam':
        return '#4CAF50';
      default:
        return '#757575';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredData(calendarData);
    } else {
      const filtered = calendarData.filter((item) =>
        item.event.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>School Calendar</Text>
      
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search events..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredData.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name={getIcon(item.type)} size={30} color={getColor(item.type)} />
              <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardEvent}>{item.event}</Text>
              <Text style={[styles.eventType, { color: getColor(item.type) }]}>{item.type}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#137e5e',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardDate: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardEvent: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  eventType: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default StudentSchoolCalendarScreen;
