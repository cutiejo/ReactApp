import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [userType, setUserType] = useState('student'); // New state for user type
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigation = useNavigation();

  const handleRegister = async () => {
    // Check if any field is empty
    if (!fullName || !email || !password || !confirmPassword || !studentId) {
      Alert.alert("Input Required", "Please fill in all the fields.");
      return;
    }

    if (!agreeTerms) {
      Alert.alert("Terms of Use", "Please agree to the Terms of Use and Privacy Policy.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "The passwords do not match.");
      return;
    }

    // Make an API call to register the user
    try {
      const response = await fetch('http://192.168.1.12/Capstone/api/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: fullName,
          email: email,
          password: password,
          confirm_password: confirmPassword,
          lrn: studentId, // Assuming LRN is the student ID
          user_type: userType, // Send user_type as either "student" or "parent"
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user session data in AsyncStorage
        await AsyncStorage.setItem('userSession', JSON.stringify({
          ...data.user,
          role: userType.toLowerCase(), // Save role as either 'student' or 'parent'
        }));

        // Show success alert after registration
        Alert.alert(
          "Registration Successful",
          userType === 'parent'
            ? "You have registered as a parent. Please log in to manage your child’s details."
            : "Your account is pending approval by an admin. You will receive access once your account is approved.",
          [{ text: "OK", onPress: () => navigation.navigate('Login') }] // Navigate to login after success
        );
      } else {
        Alert.alert("Registration Failed", data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Unable to register. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Create Account <Icon name="account" size={24} /></Text>
        <Text style={styles.subheading}>Register to get Started.</Text>
      </View>

      {/* User Type Toggle */}
      <View style={styles.userTypeContainer}>
        <TouchableOpacity
          style={[styles.userTypeOption, userType === 'student' && styles.userTypeOptionActive]}
          onPress={() => setUserType('student')}
        >
          <Text style={userType === 'student' ? styles.userTypeTextActive : styles.userTypeText}>Student</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.userTypeOption, userType === 'parent' && styles.userTypeOptionActive]}
          onPress={() => setUserType('parent')}
        >
          <Text style={userType === 'parent' ? styles.userTypeTextActive : styles.userTypeText}>Parent</Text>
        </TouchableOpacity>
      </View>

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          placeholderTextColor="#999"
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
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.eyeIconContainer} onPress={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#999"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity style={styles.eyeIconContainer} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Icon name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Student LRN Input with Dynamic Placeholder */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={userType === 'parent' ? "Enter LRN of Student" : "Enter LRN"}
          placeholderTextColor="#999"
          value={studentId}
          onChangeText={setStudentId}
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Checkbox for Terms and Privacy */}
      <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreeTerms(!agreeTerms)}>
        <Icon name={agreeTerms ? 'checkbox-marked' : 'checkbox-blank-outline'} size={24} color="#137e5e" />
        <Text style={styles.termsText}>
          By logging in, you are agreeing with our{' '}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://your-terms-url.com')}>Terms of Use</Text> and{' '}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://your-privacy-url.com')}>Privacy Policy</Text>.
        </Text>
      </TouchableOpacity>

      {/* Login Link */}
      <TouchableOpacity style={styles.loginContainer} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? <Text style={styles.link}>Login</Text></Text>
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
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
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

// User type styling
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  userTypeOption: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  userTypeOptionActive: {
    backgroundColor: '#137e5e',
  },
  userTypeText: {
    color: '#999',
  },
  userTypeTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

