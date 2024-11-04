import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function AttendanceScreen() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [statusCounts, setStatusCounts] = useState({ Present: 0, Late: 0, Absent: 0 });

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        // Retrieve user session from AsyncStorage
        const session = await AsyncStorage.getItem('userSession');
        const user = session ? JSON.parse(session) : null;

        if (user && user.user_id) {
          const response = await axios.get('http://192.168.1.12/Capstone/api/get_attendance.php', {
            params: { user_id: user.user_id },
          });

          const data = response.data;
          setAttendanceData(data);
          calculateStatusCounts(data);
        } else {
          Alert.alert("Error", "User session not found. Please log in again.");
        }
      } catch (error) {
        console.error('Error fetching attendance data:', error);
        Alert.alert("Error", "Failed to fetch attendance data.");
      }
    };

    fetchAttendanceData();
  }, []);

  const calculateStatusCounts = (data) => {
    const counts = { Present: 0, Late: 0, Absent: 0 };
    data.forEach((item) => {
      if (counts[item.status] !== undefined) {
        counts[item.status] += 1;
      }
    });
    setStatusCounts(counts);
  };

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>

      <View style={styles.statusCardsContainer}>
        <View style={[styles.statusCard, { borderLeftColor: '#4CAF50' }]}>
          <Text style={[styles.statusCount, { color: '#4CAF50' }]}>{statusCounts.Present}</Text>
          <Text style={styles.statusLabel}>Present</Text>
        </View>
        <View style={[styles.statusCard, { borderLeftColor: '#F44336' }]}>
          <Text style={[styles.statusCount, { color: '#F44336' }]}>{statusCounts.Absent}</Text>
          <Text style={styles.statusLabel}>Absent</Text>
        </View>
        <View style={[styles.statusCard, { borderLeftColor: '#FF9800' }]}>
          <Text style={[styles.statusCount, { color: '#FF9800' }]}>{statusCounts.Late}</Text>
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
                <Text style={styles.cardDate}>{moment(item.date).format('MMMM D, YYYY')}</Text>
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
    borderLeftWidth: 5,
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
