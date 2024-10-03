// screens/ExploreScreen.js
import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

export default function ExploreScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/bg.png')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.heading}>Explore the app</Text>
        <Text style={styles.paragraph}>
         RFID School Identification fo SV Montessori Imus.
         RFID School Identification fo SV Montessori Imus.
         RFID School Identification fo SV Montessori Imus.
         RFID School Identification fo SV Montessori Imus.
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 370,
    borderRadius: 20,
    marginBottom: 10,

  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1C1C1C',
  },
  paragraph: {
    textAlign: 'center',
    color: '#6C6C6C',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#0F9D58',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
