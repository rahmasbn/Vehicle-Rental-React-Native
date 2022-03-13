/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';

import styles from '../../styles/payment';
import {TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {createTransaction} from '../../utils/transaction';
import {sendLocalNotification} from '../../utils/notification';

const paymentCode = Math.ceil(Math.random() * 100000000);
const bookingCode = Math.random()
  .toString(36)
  .replace(/[^a-zA-Z0-9]+/g, '')
  .slice(0, 8);

const ThirdStep = ({navigation, route}) => {
  // console.log('third param', route.params);
  const user = useSelector(state => state.auth.userData);
  //   console.log('state', user);

  const finishPayment = () => {
    const token = user.token;
    const body = {
      user_id: user.id,
      vehicle_id: route.params.vehicleId,
      quantity: route.params.qty,
      total_payment: route.params.totalPrice * route.params.day,
      start_date: route.params.date,
      return_date: formatDate,
    };

    // console.log('body', body);
    createTransaction(body, token)
      .then(res => {
        const param = {
          ...route.params,
          transactionId: res.data.result.result.id,
        };
        console.log('third id', param);
        sendLocalNotification({
          title: 'Payment Successfully',
          message: 'Thank you for renting at vehicle rental',
        });
        navigation.navigate('DetailHistory', param);
      })
      .catch(err => {
        console.log(err);
      });
  };

  let someDate = new Date(route.params.date);
  // eslint-disable-next-line radix
  someDate.setDate(someDate.getDate() + parseInt(route.params.day));
  let formatDate = someDate.toISOString().slice(0, 10);

  const formatPrice = value => {
    const price = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    })
      .format(value)
      .replace(/(\.|,)00$/g, '');
    return price;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        flexGrow: 2,
      }}
      showsVerticalScrollIndicator={false}>
      <View style={{marginHorizontal: '18%'}}>
        <Image
          source={require('../../assets/icons/step3.png')}
          style={{resizeMode: 'cover'}}
          onError={() => require('../../assets/icons/step3.png')}
        />
      </View>
      <Text
        style={{
          textAlign: 'center',
          color: '#393939',
          fontWeight: '600',
          fontSize: 18,
          marginBottom: 10,
        }}>
        Payment Code :
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 35,
          fontWeight: 'bold',
          color: 'black',
        }}>
        {paymentCode}
      </Text>
      <Text style={{textAlign: 'center', fontSize: 15, paddingVertical: 3}}>
        Insert your payment code while you transfer booking order
      </Text>
      <Text style={{textAlign: 'center', fontSize: 15}}>Pay before :</Text>
      <Text
        style={{
          textAlign: 'center',
          color: 'darkred',
          fontWeight: '700',
          fontSize: 25,
          paddingVertical: 18,
        }}>
        1:59:34
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '600',
          fontSize: 16,
          marginBottom: 8,
        }}>
        Bank account information :
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: 'black',
          fontWeight: '600',
          fontSize: 25,
        }}>
        0290-90203-345-2
      </Text>
      <Text
        style={{
          textAlign: 'center',
          marginVertical: 10,
          fontWeight: '600',
          fontSize: 16,
        }}>
        Vehicle Rental
      </Text>
      <View
        style={{
          height: 2,
          backgroundColor: '#efefef',
          marginHorizontal: '3%',
          marginVertical: 10,
        }}
      />
      <Text
        style={{
          textAlign: 'center',
          marginVertical: 5,
          fontWeight: '600',
          fontSize: 17,
        }}>
        Booking code : <Text style={{color: 'green'}}>{bookingCode}</Text>
      </Text>
      <Text style={{textAlign: 'center', marginBottom: 8}}>
        Use booking code to pick up your {route.params.vehicleName}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#FFCD61',
          alignSelf: 'center',
          alignItems: 'center',
          paddingVertical: 15,
          width: '70%',
          height: 55,
          borderRadius: 12,
          marginBottom: '8%',
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 16,
          }}>
          Copy Payment & Booking Code
        </Text>
      </TouchableOpacity>
      <Text style={{marginHorizontal: '5%', ...styles.desc, marginBottom: -12}}>
        Order details :
      </Text>
      <View style={{marginHorizontal: '5%', marginVertical: '7%'}}>
        <Text style={styles.desc}>
          {route.params.qty} {route.params.vehicleName}
        </Text>
        <Text style={styles.desc}>{route.params.payment}</Text>
        <Text style={styles.desc}>
          {route.params.day > '1'
            ? `${route.params.day} days`
            : `${route.params.day} day`}
        </Text>
        <Text style={styles.desc}>
          {route.params.date} to {formatDate}
        </Text>
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: '#efefef',
          marginHorizontal: '5%',
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: '5%',
          marginVertical: '7%',
        }}>
        <Text style={styles.subTotal}>
          {formatPrice(route.params.totalPrice * route.params.day)}
        </Text>
        <Image
          source={require('../../assets/icons/Pricing.png')}
          style={{marginLeft: 'auto', resizeMode: 'cover'}}
        />
      </View>
      <View style={{marginVertical: 5}}>
        <TouchableOpacity style={styles.btnOrder} onPress={finishPayment}>
          <Text style={styles.order}>Finish Payment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ThirdStep;
