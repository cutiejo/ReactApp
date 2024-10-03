import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TimesheetScreen = () => {
  // Sample data
  const [timesheetData, setTimesheetData] = useState([
    { date: '2024-09-23', checkIn: '7:45 AM', checkOut: '3:15 PM', totalHours: '7h 30min' },
    { date: '2024-09-24', checkIn: '8:00 AM', checkOut: '3:30 PM', totalHours: '7h 30min' },
    { date: '2024-09-25', checkIn: '7:50 AM', checkOut: '3:20 PM', totalHours: '7h 30min' },
    { date: '2024-09-26', checkIn: '8:05 AM', checkOut: '3:45 PM', totalHours: '7h 40min' },
  ]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Timesheet</Text>
      </View>

      {/* Timesheet Table */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Date</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Check-in</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Check-out</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Total Hours</Text>
      </View>

      <ScrollView>
        {timesheetData.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableText, { flex: 2 }]}>{item.date}</Text>
            <Text style={[styles.tableText, { flex: 2 }]}>{item.checkIn}</Text>
            <Text style={[styles.tableText, { flex: 2 }]}>{item.checkOut}</Text>
            <Text style={[styles.tableText, { flex: 2 }]}>{item.totalHours}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    paddingVertical: 15,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    color: '#137e5e',
    fontSize: 26,
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#eef5f3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    color: '#137e5e',
    textAlign: 'center',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tableText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});

export default TimesheetScreen;
