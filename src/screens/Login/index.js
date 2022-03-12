/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  // ToastAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import styles from '../../styles/login';
import {loginAction} from '../../redux/actions/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const validate = () => {
    let errors = {};
    const validEmail = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );
    const validPass = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$/);

    if (!email) {
      errors.email = 'Email required';
    } else if (!validEmail.test(email)) {
      errors.email = 'Email address is invalid';
    }

    if (!password) {
      errors.password = 'Password required';
    } else if (!validPass.test(password)) {
      errors.password =
        'Password must be at least 6 characters, including lowercase, uppercase, and number';
    }

    setError(errors);
    // console.log(errors);
    return errors;
  };

  const onLogin = () => {
    const validateBody = validate();

    const body = {
      email: email,
      password: password.trim(),
    };

    // console.log('body', body);
    if (Object.keys(validateBody).length === 0) {
      dispatch(loginAction(body));
    }
  };

  useEffect(() => {
    if (auth.isFulfilled === true) {
      // ToastAndroid.showWithGravity(
      //   'Login Successful',
      //   ToastAndroid.LONG,
      //   ToastAndroid.TOP,
      // );
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        visibilityTime: 5000,
      });
      navigation.navigate('Home');
    }
    if (auth.isRejected === true) {
      let errors = {};
      errors.form = 'Email/Password is invalid';
      setError(errors);
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
          {error.email && (
            <Text style={{...styles.error, marginTop: -10}}>{error.email}</Text>
          )}
          <TextInput
            style={styles.password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          {error.password && <Text style={styles.error}>{error.password}</Text>}
        </KeyboardAvoidingView>
        {error.form && (
          <Text
            style={{
              textAlign: 'center',
              color: 'red',
              fontSize: 16,
              marginBottom: 10,
              paddingTop: 5,
              fontWeight: '600',
            }}>
            {error.form}
          </Text>
        )}
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
