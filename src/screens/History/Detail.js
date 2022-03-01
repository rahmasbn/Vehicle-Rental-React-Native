/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {getDetailTransaction} from '../../utils/transaction';
import styles from '../../styles/history';

const HistoryDetail = ({navigation, route}) => {
  //   console.log('history', route.params);

  const user = useSelector(state => state.auth.userData);
  const [data, setData] = useState({});
  const [imgVehicle, setImgVehicle] = useState(
    require('../../assets/images/default-cars.jpeg'),
  );
  const formatPrice = value => {
    const price = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    })
      .format(value)
      .replace(/(\.|,)00$/g, '');
    return price;
  };

  const getDetail = () => {
    const id = route.params.transactionId;
    const token = user.token;
    console.log('detail', data);

    getDetailTransaction(token, id)
      .then(res => {
        // console.log('detail', res.data.result[0]);
        const moment = require('moment');
        let start_date = moment(res.data.result[0].start_date).format(
          'YYYY-MM-DD',
        );
        let return_date = moment(res.data.result[0].return_date).format(
          'YYYY-MM-DD',
        );
        // console.log(dob)
        const result = {...res.data.result[0], start_date, return_date};
        const image = JSON.parse(res.data.result[0].images);
        if (image !== null) {
          setImgVehicle(image);
        }
        setData(result);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Content', {screen: 'Screens'})}>
          <Image
            source={require('../../assets/icons/left-arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>See History</Text>
      </View>
      <Text style={styles.paymentStatus}>Payment Success!</Text>
      <Image
        source={{
          uri: `${process.env.HOST}/${imgVehicle[0]}`,
        }}
        style={styles.vehicleImg}
        onError={() => {
          setImgVehicle(require('../../assets/images/default-cars.jpeg'));
        }}
      />
      <View style={{marginHorizontal: '5%', marginVertical: '7%'}}>
        <Text style={styles.desc}>
          {data.qty} {data.vehicle}
        </Text>
        <Text style={styles.desc}>{route.params.payment}</Text>
        <Text style={styles.desc}>
          {route.params.day > '1'
            ? `${route.params.day} days`
            : `${route.params.day} day`}
        </Text>
        <Text style={styles.desc}>
          {data.start_date} to {data.return_date}
        </Text>
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: '#efefef',
          marginHorizontal: '5%',
        }}
      />
      <View style={{marginVertical: '5%', marginHorizontal: '5%'}}>
        <Text style={styles.desc}>ID : {route.params.idCard}</Text>
        <Text style={styles.desc}>
          {route.params.firstName} {route.params.lastName} ({route.params.email}
          )
        </Text>
        <Text style={styles.desc}>
          {route.params.phone} <Text style={{color: 'green'}}>(active)</Text>{' '}
        </Text>
        <Text style={styles.desc}>
          {data.address !== null ? data.address : route.params.location}
        </Text>
      </View>
      <View
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
            fontSize: 18,
          }}>
          Total : {formatPrice(data.total_payment)}
        </Text>
      </View>
    </ScrollView>
  );
};

export default HistoryDetail;
