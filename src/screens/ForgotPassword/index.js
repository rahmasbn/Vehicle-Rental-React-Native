/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import Toast from 'react-native-toast-message';

import styles from '../../styles/forgotPass';
import {checkOTP, forgotPass, resetPass} from '../../utils/auth';

const CELL_COUNT = 6;

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [isSend, setIsSend] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const validate = () => {
    let errors = {};

    if (typeof password !== 'undefined') {
      const validPass = new RegExp(
        '^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$',
      );
      if (!validPass.test(password)) {
        errors.password =
          'Password must be at least 6 characters, including lowercase, uppercase, and number';
      }
    }

    if (typeof password !== 'undefined' && typeof confirmPass !== 'undefined') {
      if (password !== confirmPass) {
        errors.confirmPass = "Password don't match";
      }
    }
    setError(errors);
    return errors;
  };

  const sendCode = async () => {
    const body = {
      email: email,
    };
    forgotPass(body)
      .then(res => {
        console.log(res.data);
        const emailUser = res.data.result.data.email;

        const storeData = async () => {
          try {
            await AsyncStorage.setItem('email', emailUser);
          } catch (err) {
            console.error(err);
          }
        };
        storeData();
        setIsSend(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const verifyOtp = () => {
    const getData = async () => {
      try {
        const values = await AsyncStorage.getItem('email');
        if (values !== null) {
          setEmail(values);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();

    const body = {
      email: email,
      otp: value,
    };

    checkOTP(body)
      .then(res => {
        console.log(res.data);
        const storeData = async () => {
          try {
            await AsyncStorage.setItem('otp', value);
          } catch (err) {
            console.error(err);
          }
        };
        storeData();
        setIsVerify(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const resetPassword = () => {
    const getData = async () => {
      try {
        const values = await AsyncStorage.getItem('email');
        const otp = await AsyncStorage.getItem('otp');
        if (values !== null) {
          setEmail(values);
        }
        if (otp !== null) {
          setValue(otp);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();

    const validateBody = validate();
    const body = {
      email: email,
      otp: value,
      password: password,
    };

    if (Object.keys(validateBody).length === 0) {
      resetPass(body)
        .then(res => {
          console.log(res.data);

          const remove = async () => {
            try {
              await AsyncStorage.removeItem('email');
              await AsyncStorage.removeItem('otp');
            } catch (err) {
              console.log(err);
            }
          };
          remove();
          setIsSubmit(true);
          Toast.show({
            type: 'success',
            text1: 'Reset Password Successfully',
            visibilityTime: 5000,
          });
          navigation.navigate('Login');
        })
        .catch(err => {
          console.log(err);
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
        source={require('../../assets/images/forgot-background.jpg')}
        style={styles.background}>
        <Text style={styles.title}>THAT'S OKAY, WE GOT YOUR BACK</Text>
        {!isSend ? (
          <>
            <Text style={styles.text}>
              Enter your email to get reset password code
            </Text>
            <KeyboardAvoidingView>
              <TextInput
                style={styles.email}
                placeholder="Enter your email address"
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
              />
            </KeyboardAvoidingView>
            <TouchableOpacity style={styles.btnSend} onPress={sendCode}>
              <Text style={styles.code}>Send Code</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {!isVerify ? (
              <>
                <Text
                  style={{
                    ...styles.text,
                    marginHorizontal: 10,
                    marginTop: '40%',
                  }}>
                  Enter your reset password code to verify your account. If you
                  don't receive any code{' '}
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '900',
                      fontSize: 15,
                      textDecorationLine: 'underline',
                    }}
                    onPress={sendCode}>
                    Resend Code
                  </Text>
                </Text>
                <KeyboardAvoidingView>
                  <CodeField
                    ref={ref}
                    {...props}
                    value={value}
                    onChangeText={setValue}
                    rootStyle={{marginVertical: 30, marginHorizontal: '5%'}}
                    cellCount={CELL_COUNT}
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    renderCell={({idx, symbol, isFocused}) => (
                      <Text
                        key={idx}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(idx)}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    )}
                  />
                </KeyboardAvoidingView>
                <TouchableOpacity style={styles.btnSend} onPress={verifyOtp}>
                  <Text style={styles.code}>Confirm</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text
                  style={{
                    ...styles.text,
                    marginHorizontal: 10,
                    marginTop: '35%',
                  }}>
                  Type your password twice so we can confirm your new password
                </Text>
                <KeyboardAvoidingView>
                  <TextInput
                    style={styles.email}
                    placeholder="Enter new password"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                  />
                  {error.password && (
                    <Text style={{...styles.error, marginTop: -10}}>
                      {error.password}
                    </Text>
                  )}
                  <TextInput
                    style={{...styles.email, marginTop: -7}}
                    placeholder="Confirm your new password"
                    secureTextEntry={true}
                    onChangeText={text => setConfirmPass(text)}
                  />
                  {error.confirmPass && (
                    <Text style={styles.error}>{error.confirmPass}</Text>
                  )}
                </KeyboardAvoidingView>
                <TouchableOpacity
                  style={styles.btnSend}
                  onPress={resetPassword}>
                  <Text style={styles.code}>Reset Password</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </ImageBackground>
    </ScrollView>
  );
};

export default ForgotPassword;
