/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import styles from '../../styles/profile';
import {editPassword} from '../../utils/users';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const UpdatePassword = ({navigation}) => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const token = useSelector(state => state.auth.userData.token);

  const validate = () => {
    let errors = {};

    if (typeof newPass !== 'undefined') {
      const validPass = new RegExp(
        '^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{6,}$',
      );
      if (!validPass.test(newPass)) {
        errors.newPass =
          'Password must be at least 6 characters, including lowercase, uppercase, and number';
      }
    }

    if (typeof newPass !== 'undefined' && typeof confirmPass !== 'undefined') {
      if (newPass !== confirmPass) {
        errors.confirmPass = "Password don't match";
      }
    }
    setError(errors);
    return errors;
  };

  const changePass = () => {
    const validateBody = validate();

    const body = {
      currentPass: currentPass,
      newPass: newPass,
    };
    if (Object.keys(validateBody).length === 0) {
      editPassword(token, body)
        .then(res => {
          console.log(res.data);
          setIsSubmit(true);
          Toast.show({
            type: 'success',
            text1: 'Password updated Successfully',
            visibilityTime: 5000,
          });
          navigation.navigate('Home');
        })
        .catch(err => {
          console.log(err);
          let errors = {};
          errors.currentPass = 'Current Password is invalid';
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
    <View style={styles.container}>
      <View style={{marginVertical: '10%', marginHorizontal: '5%'}}>
        <Text>Current Password :</Text>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.inputStyle}
            secureTextEntry={true}
            onChangeText={text => setCurrentPass(text)}
          />
        </KeyboardAvoidingView>
        {error.currentPass && (
          <Text style={styles.error}>{error.currentPass}</Text>
        )}
        <Text style={{marginTop: 15}}>New Password :</Text>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.inputStyle}
            secureTextEntry={true}
            onChangeText={text => setNewPass(text)}
          />
        </KeyboardAvoidingView>
        {error.newPass && <Text style={styles.error}>{error.newPass}</Text>}
        <Text style={{marginTop: 15}}>Confirm New Password :</Text>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.inputStyle}
            secureTextEntry={true}
            onChangeText={text => setConfirmPass(text)}
          />
        </KeyboardAvoidingView>
        {error.confirmPass && (
          <Text style={styles.error}>{error.confirmPass}</Text>
        )}
        <TouchableOpacity
          style={{...styles.btnSave, marginTop: 50}}
          onPress={changePass}>
          <Text style={styles.save}>Change Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpdatePassword;
