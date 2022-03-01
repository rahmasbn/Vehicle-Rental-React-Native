/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

import styles from '../../styles/payment';

const SecondStep = ({navigation, route}) => {
  let someDate = new Date(route.params.date);
  const moment = require('moment');
  // eslint-disable-next-line radix
  someDate.setDate(someDate.getDate() + parseInt(route.params.day));
  let formatDate = moment(someDate.toISOString()).format('YYYY-MM-DD');
  //   console.log(formatDate);

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
    <View style={styles.container}>
      <View style={{marginHorizontal: '18%'}}>
        <Image
          source={require('../../assets/icons/step2.png')}
          style={{resizeMode: 'cover'}}
        />
      </View>
      <Image
        source={{
          uri: `${process.env.HOST}/${route.params.image}`,
        }}
        style={styles.vehicleImg}
        onError={() => {
          require('../../assets/images/default-cars.jpeg');
        }}
      />
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
        <TouchableOpacity
          style={styles.btnOrder}
          onPress={() => {
            const param = {
              ...route.params,
            };
            navigation.navigate('ThirdStep', param);
          }}>
          <Text style={styles.order}>Get Payment Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SecondStep;
