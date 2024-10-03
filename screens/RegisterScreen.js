import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false); // Checkbox for Terms
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!agreeTerms) {
      Alert.alert("Terms of Use", "Please agree to the Terms of Use and Privacy Policy.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "The passwords do not match.");
      return;
    }

    // Handle registration logic here
    Alert.alert("Registered", `Welcome, ${fullName}!`);
  };

  return (
    <View style={styles.container}>
      {/* Logo and Title */}
      <View style={styles.header}>
        <Text style={styles.heading}>
          Create Account <Icon name="account" size={24} />
        </Text>
        <Text style={styles.subheading}>Register to get Started.</Text>
      </View>

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={fullName}
          onChangeText={setFullName}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Email Address"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.eyeIconContainer} onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye-off" : "eye"} size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#999"
          secureTextEntry={!showConfirmPassword}
          autoCapitalize="none"
          autoCorrect={false}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.eyeIconContainer} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon name={showConfirmPassword ? "eye-off" : "eye"} size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Student ID Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Student ID"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          value={studentId}
          onChangeText={setStudentId}
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.or}>Or sign in with</Text>
        <View style={styles.divider} />
      </View>

      {/* Google Button */}
      <TouchableOpacity style={styles.googleButton}>
        <Icon name="google" size={24} color="#FFF" style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Terms and Privacy */}
      <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreeTerms(!agreeTerms)}>
        <Icon name={agreeTerms ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="#137e5e" />
        <Text style={styles.termsText}>
          By registering, you are agreeing with our{' '}
          <Text style={styles.link}>Terms of Use</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </TouchableOpacity>

      {/* Login */}
      <TouchableOpacity style={styles.loginContainer} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? <Text style={styles.link}>Log in</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#F8F8F8',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subheading: {
    fontSize: 18,
    color: '#6C6C6C',
    textAlign: 'center',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    fontSize: 16,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  button: {
    backgroundColor: '#137e5e',
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  divider: {
    height: 1,
    width: '30%',
    backgroundColor: '#CCC',
  },
  or: {
    color: '#6C6C6C',
    fontSize: 16,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  googleIcon: {
    marginRight: 10,
  },
  googleButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  termsText: {
    flex: 1,
    color: '#6C6C6C',
    fontSize: 14,
    marginLeft: 10,
  },
  link: {
    color: '#137e5e',
    textDecorationLine: 'underline',
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#6C6C6C',
  },
});
