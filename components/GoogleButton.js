import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function GoogleButton() {
  return (
    <TouchableOpacity style={styles.googleButton}>
      <Icon name="google" size={24} color="#FFF" style={styles.googleIcon} />
      <Text style={styles.googleButtonText}>Continue with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
