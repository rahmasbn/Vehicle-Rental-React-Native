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
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';

import styles from '../../styles/payment';
import {getProfile} from '../../utils/users';
import {useSelector} from 'react-redux';
// import {useDispatch} from 'react-redux';
// import {detailPayment} from '../../redux/actions/payment';

const FirstStep = ({navigation, route}) => {
  const [idCard, setIdCard] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [payment, setPayment] = useState('Prepayment (No Tax)');
  const [userData, setUserData] = useState([]);
  const user = useSelector(state => state.auth.userData);

  // const dispatch = useDispatch();

  const getUser = () => {
    const token = user.token;

    getProfile(token)
      .then(res => {
        setUserData(res.data.result[0]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(phone);

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
          placeholder="Name"
          defaultValue={userData.name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile phone (must be active)"
          keyboardType="number-pad"
          onChangeText={text => setPhone(text)}
          defaultValue={userData.phone_number}
        />
        <TextInput
          style={styles.input}
          placeholder="Email address"
          onChangeText={text => setEmail(text)}
          defaultValue={userData.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Location (home, office, etc)"
          defaultValue={userData.address}
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
              name: name !== '' ? name : userData.name,
              phone: phone !== '' ? phone : userData.phone_number,
              email: email !== '' ? email : userData.email,
              location: location !== '' ? location : userData.address,
              payment: payment,
            };
            // dispatch(detailPayment(data));
            navigation.navigate('SecondStep', param);
          }}>
          <Text style={styles.order}>See Order Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default FirstStep;
