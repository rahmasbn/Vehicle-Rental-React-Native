import React, {useState} from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {register} from '../../utils/auth';

import styles from '../../styles/register';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignUp = () => {
    const body = {
      name: name,
      email: email,
      password: password,
    };
    // console.log('body', body);
    register(body)
      .then(res => {
        console.log(res.data);
        navigation.navigate('Login');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bg-signup.jpg')}
        style={styles.background}>
        <Text style={styles.title}>LET'S HAVE SOME RIDE</Text>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.name}
            placeholder="Name"
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={styles.email}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.btnSignup} onPress={onSignUp}>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.login}>
          Already have an account?{' '}
          <Text
            style={styles.text}
            onPress={() => navigation.navigate('Login')}>
            Login now
          </Text>
        </Text>
      </ImageBackground>
    </ScrollView>
  );
};

export default Register;
