import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState(null); // Updated: default set to null
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Navigate based on userType change
    if (userType) {
      if (userType === 'Student') {
        navigation.replace('StudentStack');
      } else if (userType === 'Parent') {
        navigation.replace('ParentStack');
      }
    }
  }, [userType]); // Dependency array to watch for userType changes

  const handleLogin = () => {
    if (!agreeTerms) {
      Alert.alert("Terms of Use", "Please agree to the Terms of Use and Privacy Policy.");
      return;
    }

    // Set user type, useEffect will handle navigation
    setUserType(userType);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleGoogleSignIn = () => {
    Alert.alert('Google Sign-In', 'Google Sign-In will be implemented.');
  };

  return (
    <View style={styles.container}>
      {/* Logo and Title */}
      <View style={styles.header}>
        <Image source={require('../assets/sv_logo.png')} style={styles.logo} />
        <Text style={styles.heading}>
          Login Account <Icon name="account" size={24} />
        </Text>
        <Text style={styles.subheading}>Welcome back!</Text>
      </View>

      {/* Radio Buttons for User Type */}
      <View style={styles.radioButtonGroup}>
        <TouchableOpacity style={styles.radioButtonItem} onPress={() => setUserType('Student')}>
          <View style={styles.radioButtonOuter}>
            <View style={userType === 'Student' ? styles.radioButtonSelected : null} />
          </View>
          <Text style={styles.radioLabel}>Student</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.radioButtonItem} onPress={() => setUserType('Parent')}>
          <View style={styles.radioButtonOuter}>
            <View style={userType === 'Parent' ? styles.radioButtonSelected : null} />
          </View>
          <Text style={styles.radioLabel}>Parent</Text>
        </TouchableOpacity>
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
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

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.or}>Or sign in with</Text>
        <View style={styles.divider} />
      </View>

      {/* Google Button */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
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

      {/* Register */}
      <TouchableOpacity style={styles.registerContainer} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don’t have an account? <Text style={styles.link}>Register</Text></Text>
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
  logo: {
    width: 120,
    height: 60,
    marginBottom: 20,
    resizeMode: 'contain',
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
  radioButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  radioButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioButtonOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#137e5e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#137e5e',
  },
  radioLabel: {
    fontSize: 16,
    color: '#000',
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#137e5e',
    textDecorationLine: 'underline',
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
  registerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: '#6C6C6C',
  },
});
