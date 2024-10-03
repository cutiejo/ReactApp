import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ParentAttendanceScreen = () => {
  // Sample attendance data
  const [attendanceData, setAttendanceData] = useState([
    { date: '2024-09-23', status: 'Present' },
    { date: '2024-09-24', status: 'Absent' },
    { date: '2024-09-25', status: 'Late' },
    { date: '2024-09-26', status: 'Present' },
  ]);

  const [attendanceOverview, setAttendanceOverview] = useState({
    present: 2,
    absent: 1,
    late: 1,
    totalSchoolDays: 30, // Total number of school days
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return '#4CAF50'; // Green for present
      case 'Late':
        return '#FF9800'; // Orange for late
      case 'Absent':
        return '#F44336'; // Red for absent
      default:
        return '#757575'; // Default gray color
    }
  };

  useEffect(() => {
    // Fetch attendance data from API and update state here
    // setAttendanceData(response.data);
    // setAttendanceOverview({ present: x, absent: y, late: z, totalSchoolDays: totalDays });
  }, []);

  return (
    <View style={styles.container}>
      {/* Attendance Overview */}
      <View style={styles.overviewContainer}>
        <View style={styles.overviewCard}>
          <Icon name="calendar-month" size={40} color="#2196F3" />
          <Text style={styles.overviewNumber}>{attendanceOverview.totalSchoolDays}</Text>
          <Text style={styles.overviewLabel}>Total School Days</Text>
        </View>
        <View style={styles.overviewCard}>
          <Icon name="check-circle" size={40} color="#4CAF50" />
          <Text style={styles.overviewNumber}>{attendanceOverview.present}</Text>
          <Text style={styles.overviewLabel}>Days Present</Text>
        </View>
        <View style={styles.overviewCard}>
          <Icon name="close-circle" size={40} color="#F44336" />
          <Text style={styles.overviewNumber}>{attendanceOverview.absent}</Text>
          <Text style={styles.overviewLabel}>Days Absent</Text>
        </View>
        <View style={styles.overviewCard}>
          <Icon name="clock-outline" size={40} color="#FF9800" />
          <Text style={styles.overviewNumber}>{attendanceOverview.late}</Text>
          <Text style={styles.overviewLabel}>Late Arrivals</Text>
        </View>
      </View>

      {/* Attendance Records */}
      <ScrollView style={styles.attendanceList}>
        {attendanceData.map((record, index) => (
          <View key={index} style={styles.recordItem}>
            <View style={styles.recordDate}>
              <Icon name="calendar-blank-outline" size={24} color="#137e5e" />
              <Text style={styles.dateText}>{record.date}</Text>
            </View>
            <View style={styles.recordStatus}>
              <Icon name="check-circle-outline" size={24} color={getStatusColor(record.status)} />
              <Text style={[styles.statusText, { color: getStatusColor(record.status) }]}>{record.status}</Text>
            </View>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Allow cards to wrap if they overflow
    marginBottom: 20,
  },
  overviewCard: {
    width: '48%', // Adjusted width to fit more cards
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  overviewNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#757575',
  },
  attendanceList: {
    marginTop: 20,
  },
  recordItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recordDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  recordStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});

export default ParentAttendanceScreen;
