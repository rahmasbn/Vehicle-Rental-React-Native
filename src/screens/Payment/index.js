/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';

import styles from '../../styles/payment';

const FirstStep = ({navigation, route}) => {
  const [idCard, setIdCard] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [payment, setPayment] = useState('Prepayment (No Tax)');

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{marginHorizontal: '18%'}}>
        <Image
          source={require('../../assets/icons/step1.png')}
          style={{resizeMode: 'cover'}}
        />
      </View>
      <KeyboardAvoidingView style={{marginHorizontal: '5%'}}>
        <TextInput
          style={styles.input}
          placeholder="ID card number"
          keyboardType="numeric"
          onChangeText={text => setIdCard(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="First name"
          onChangeText={text => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          onChangeText={text => setLastName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile phone (must be active)"
          keyboardType="number-pad"
          onChangeText={text => setPhone(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email address"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Location (home, office, etc)"
          onChangeText={text => setLocation(text)}
        />
      </KeyboardAvoidingView>
      <View style={styles.selectWrapper}>
        <Picker
          style={{color: '#999999'}}
          selectedValue={payment}
          onValueChange={val => setPayment(val)}>
          <Picker.Item
            label="Prepayment (No Tax)"
            value={'Prepayment (No Tax)'}
          />
          <Picker.Item
            label="Pay At The End (Include Tax)"
            value={'Pay At The End (Include Tax)'}
          />
          <Picker.Item
            label="Partial Payment (Include Tax)"
            value={'Partial Payment (Include Tax)'}
          />
        </Picker>
      </View>
      <View style={{marginTop: 25}}>
        <TouchableOpacity
          style={styles.btnOrder}
          onPress={() => {
            const param = {
              ...route.params,
              idCard: idCard,
              firstName: firstName,
              lastName: lastName,
              phone: phone,
              email: email,
              location: location,
              payment: payment,
            };
            navigation.navigate('SecondStep', param);
          }}>
          <Text style={styles.order}>See Order Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FirstStep;
