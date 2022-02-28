import React from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import styles from '../../styles/forgotPass';

const ForgotPassword = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/forgot-background.jpg')}
        style={styles.background}>
        <Text style={styles.title}>THAT'S OKAY, WE GOT YOUR BACK</Text>
        <Text style={styles.text}>Enter your email to get reset password code</Text>
        <KeyboardAvoidingView>
          <TextInput style={styles.email} placeholder="Enter your email address" keyboardType='email-address'/>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.btnSend}>
          <Text style={styles.code}>Send Code</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};

export default ForgotPassword;
