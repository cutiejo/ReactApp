import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchLogs } from '../services/api';
import LogItem from '../components/LogItem';

const LogsScreen = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const loadLogs = async () => {
      const logs = await fetchLogs();
      setLogs(logs);
    };

    loadLogs();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Logs</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <LogItem log={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default LogsScreen;
