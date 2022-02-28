import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import styles from '../../styles/login';
import {loginAction} from '../../redux/actions/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const onLogin = () => {
    const body = {
      email: email.trim(),
      password: password.trim(),
    };

    console.log('body', body);
    dispatch(loginAction(body));
  };

  useEffect(() => {
    if (auth.isFulfilled === true) {
      navigation.navigate('Content');
    }
  }, [auth, navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bg-login.jpg')}
        style={styles.background}>
        <Text style={styles.title}>LET'S EXPLORE THE WORLD</Text>
        <KeyboardAvoidingView>
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
        <Text
          style={styles.text}
          onPress={() => navigation.navigate('ForgotPass')}>
          Forgot Password?
        </Text>
        <TouchableOpacity style={styles.btnLogin} onPress={onLogin}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.signup}>
          Don't have account?{' '}
          <Text
            style={styles.text}
            onPress={() => navigation.navigate('Register')}>
            Sign up now
          </Text>
        </Text>
      </ImageBackground>
    </View>
  );
};

export default Login;
