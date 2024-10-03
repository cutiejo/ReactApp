import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AttendanceScreen() {
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, date: '2024-09-23', status: 'Present' },
    { id: 2, date: '2024-09-24', status: 'Late' },
    { id: 3, date: '2024-09-25', status: 'Absent' },
    { id: 4, date: '2024-09-26', status: 'Present' },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return '#4CAF50';
      case 'Late':
        return '#FF9800';
      case 'Absent':
        return '#F44336';
      default:
        return '#757575';
    }
  };

  useEffect(() => {
    // You would typically fetch this from your backend API
    // Example: setAttendanceData(response.data);
  }, []);

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Attendance</Text>

      {/* Status Cards */}
      <View style={styles.statusCardsContainer}>
        <View style={[styles.statusCard, { borderLeftColor: '#4CAF50' }]}>
          <Text style={[styles.statusCount, { color: '#4CAF50' }]}>8</Text>
          <Text style={styles.statusLabel}>Present</Text>
        </View>
        <View style={[styles.statusCard, { borderLeftColor: '#F44336' }]}>
          <Text style={[styles.statusCount, { color: '#F44336' }]}>1</Text>
          <Text style={styles.statusLabel}>Absent</Text>
        </View>
        <View style={[styles.statusCard, { borderLeftColor: '#FF9800' }]}>
          <Text style={[styles.statusCount, { color: '#FF9800' }]}>4</Text>
          <Text style={styles.statusLabel}>Late</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {attendanceData.length === 0 ? (
          <Text style={styles.noDataText}>No attendance data available</Text>
        ) : (
          attendanceData.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Icon name="calendar-blank-outline" size={20} color="#137e5e" />
                <Text style={styles.cardDate}>{item.date}</Text>
              </View>
              <View style={styles.cardBody}>
                <Icon name="check-circle-outline" size={24} color={getStatusColor(item.status)} />
                <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>{item.status}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b3b3b',
    textAlign: 'center',
    marginBottom: 20,
  },
  statusCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  statusCard: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderLeftWidth: 5, // Border on the left to match the desired design
  },
  statusCount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statusLabel: {
    fontSize: 16,
    color: '#757575',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#757575',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
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
    alignItems: 'center',
  },
  statusText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
