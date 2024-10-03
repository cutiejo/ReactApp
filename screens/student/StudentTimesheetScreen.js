import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const StudentTimesheetScreen = () => {
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
        <Text style={styles.headerText}>Hi,</Text>
        <Text style={styles.subHeaderText}>Student Name</Text>
      </View>

      {/* Timesheet Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Date</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Check-in</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Check-out</Text>
        <Text style={[styles.tableHeaderText, { flex: 2 }]}>Total Hours</Text>
      </View>

      {/* Timesheet Data Rows */}
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
    paddingVertical: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    color: '#333',
  },
  subHeaderText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#eef5f3',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    color: '#137e5e',
    textAlign: 'center',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
});

export default StudentTimesheetScreen;
