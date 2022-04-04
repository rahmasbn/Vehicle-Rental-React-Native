/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  // ToastAndroid,
} from 'react-native';
import Toast from 'react-native-toast-message';

import {register} from '../../utils/auth';
import styles from '../../styles/register';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const validate = () => {
    let errors = {};
    // eslint-disable-next-line no-useless-escape
    const validName = new RegExp(/^([a-zA-Z'\-])+$/);
    const validEmail = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );
    const validPass = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$/);

    if (!name) {
      errors.name = 'Name required';
    } else if (!validName.test(name)) {
      errors.name = 'Name is invalid';
    }

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

  const onSignUp = () => {
    const validateBody = validate();
    // console.log(validateBody);
    const body = {
      name: name,
      email: email,
      password: password,
    };
    // console.log('body', body);
    if (Object.keys(validateBody).length === 0) {
      register(body)
        .then(res => {
          console.log(res.data);
          setIsSubmit(true);
          // ToastAndroid.showWithGravity(
          //   'Registration Successful',
          //   ToastAndroid.LONG,
          //   ToastAndroid.TOP,
          // );
          Toast.show({
            type: 'success',
            text1: 'Registration Successfully',
            visibilityTime: 5000,
          });
          navigation.navigate('Login');
        })
        .catch(err => {
          console.log(err);
          let errors = {};
          errors.form = 'Email already exist';
          setError(errors);
        });
    }
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      console.log('isSubmit', true);
    }
  }, [error, isSubmit]);


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../../assets/images/bg-signup.jpg')}
        style={styles.background}>
        <Text style={styles.title}>LET'S HAVE SOME RIDE</Text>
        <KeyboardAvoidingView>
          <TextInput
            style={Object.keys(error).length > 0 ? {...styles.name, marginTop: '30%'} : styles.name}
            placeholder="Name"
            onChangeText={text => setName(text)}
          />
          {error.name && <Text style={styles.error}>{error.name}</Text>}
          <TextInput
            style={styles.email}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
          />
          {error.email && <Text style={styles.error}>{error.email}</Text>}
          <TextInput
            style={styles.password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
          {error.password && <Text style={styles.error}>{error.password}</Text>}
        </KeyboardAvoidingView>
        {error.form && (
          <Text style={{textAlign: 'center', color: 'red', fontSize: 16}}>
            {error.form}
          </Text>
        )}
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
