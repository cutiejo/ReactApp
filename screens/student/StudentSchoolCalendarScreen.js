import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StudentSchoolCalendarScreen = () => {
  const [calendarData, setCalendarData] = useState([
    { id: 1, date: '2024-10-05', event: 'Foundation Day', type: 'Holiday' },
    { id: 2, date: '2024-10-12', event: 'Math Week', type: 'Event' },
    { id: 3, date: '2024-10-20', event: 'School Sports Day', type: 'Event' },
    { id: 4, date: '2024-11-01', event: 'All Saints Day', type: 'Holiday' },
    { id: 5, date: '2024-11-10', event: 'Exams Begin', type: 'Exam' },
  ]);

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
        return '#F44336'; // Red for holidays
      case 'Event':
        return '#FF9800'; // Orange for events
      case 'Exam':
        return '#4CAF50'; // Green for exams
      default:
        return '#757575'; // Grey for default
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>School Calendar</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {calendarData.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name={getIcon(item.type)} size={30} color={getColor(item.type)} />
              <Text style={styles.cardDate}>{item.date}</Text>
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
