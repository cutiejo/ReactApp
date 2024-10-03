import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ParentsInformationScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Parents Information</Text>
      </View>
      
      {/* Parent/Guardian 1 Information */}
      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Icon name="account" size={24} color="#1F5D50" />
          <Text style={styles.sectionTitle}>Parent/Guardian 1</Text>
        </View>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>Jane Doe</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <View style={styles.row}>
          <Icon name="phone" size={18} color="#137e5e" />
          <Text style={styles.value}>+1 234 567 890</Text>
        </View>

        <Text style={styles.label}>Email:</Text>
        <View style={styles.row}>
          <Icon name="email" size={18} color="#137e5e" />
          <Text style={styles.value}>janedoe@example.com</Text>
        </View>
        
        {/* Divider */}
        <View style={styles.divider} />
        
        {/* Parent/Guardian 2 Information */}
        <View style={styles.sectionHeader}>
          <Icon name="account" size={24} color="#1F5D50" />
          <Text style={styles.sectionTitle}>Parent/Guardian 2</Text>
        </View>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>John Doe</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <View style={styles.row}>
          <Icon name="phone" size={18} color="#137e5e" />
          <Text style={styles.value}>+1 987 654 321</Text>
        </View>

        <Text style={styles.label}>Email:</Text>
        <View style={styles.row}>
          <Icon name="email" size={18} color="#137e5e" />
          <Text style={styles.value}>johndoe@example.com</Text>
        </View>
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
