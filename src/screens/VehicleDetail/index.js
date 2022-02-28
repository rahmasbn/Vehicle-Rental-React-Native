/* eslint-disable no-sequences */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';

import {getDetailVehicle} from '../../utils/vehicles';
import styles from '../../styles/detail';
import {Picker} from '@react-native-picker/picker';

const VehicleDetail = ({navigation, route}) => {
  const [detailVehicle, setDetailVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(1);
  const [visible, setVisible] = useState(false);
  const [chosenDate, setChosenDate] = useState(false);
  const [day, setDay] = useState('1');
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
    const id = route.params.id;

    getDetailVehicle(id)
      .then(res => {
        // console.log(res.data.result[0]);
        const image = JSON.parse(res.data.result[0].images);
        // console.log('url', image[0]);
        setImgVehicle(image);
        setDetailVehicle(res.data.result[0]);
        setIsLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addCounter = () => {
    if (detailVehicle.stock > counter) {
      setCounter(counter + 1);
    }
  };

  const subCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  const handlePicker = date => {
    const moment = require('moment');
    setVisible(false), setChosenDate(moment(date).format('YYYY-MM-DD'));
  };

  useEffect(() => {
    getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <ImageBackground
            source={{
              uri: `${process.env.HOST}/${imgVehicle[0]}`,
            }}
            style={styles.img}
            onError={() => {
              setImgVehicle(require('../../assets/images/default-cars.jpeg'));
            }}
          />
          <View style={{marginTop: 10}}>
            <View style={styles.wrapper}>
              <View style={styles.left}>
                <Text style={styles.name}>{detailVehicle.name}</Text>
                <Text style={styles.price}>
                  {formatPrice(detailVehicle.price)}/day
                </Text>
              </View>
              <View style={styles.right}>
                <TouchableOpacity style={styles.iconChat}>
                  <Image source={require('../../assets/icons/msg.png')} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginLeft: '5%', marginBottom: '7%'}}>
              <Text style={{fontSize: 16, fontWeight: '400'}}>
                Max For {detailVehicle.capacity} Person
              </Text>
              <Text style={{fontSize: 16, fontWeight: '400', paddingBottom: 3}}>
                No Prepayment
              </Text>
              <Text style={{fontSize: 16, fontWeight: '600', color: '#087e0d'}}>
                {detailVehicle.status}
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: '5%'}}>
              <Image
                source={require('../../assets/icons/location.png')}
                style={styles.icon}
              />
              <Text style={styles.city}>{detailVehicle.city}</Text>
            </View>
            <View style={styles.wrapper}>
              <View style={styles.left}>
                <Text style={styles.type}>Select {detailVehicle.type}</Text>
              </View>
              <View
                style={{
                  ...styles.counterWrapper,
                  ...styles.right,
                }}>
                <TouchableOpacity
                  style={styles.btnCounter}
                  onPress={subCounter}>
                  <Text style={styles.sub}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counter}>{counter}</Text>
                <TouchableOpacity
                  style={styles.btnCounter}
                  onPress={addCounter}>
                  <Text style={styles.add}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.wrapper}>
              <View style={{...styles.left, marginVertical: 20}}>
                <TouchableOpacity
                  style={styles.selectDate}
                  onPress={() => setVisible(true)}>
                  {chosenDate ? (
                    <Text style={styles.date}>{chosenDate}</Text>
                  ) : (
                    <Text style={styles.date}>Select Date</Text>
                  )}
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={visible}
                  mode={'date'}
                  onConfirm={handlePicker}
                  onCancel={() => setVisible(false)}
                />
              </View>
              <View style={{...styles.selectWrapper, ...styles.right}}>
                <Picker
                  style={styles.selectDay}
                  selectedValue={day}
                  onValueChange={val => setDay(val)}>
                  <Picker.Item label="1 Day" value={'1'} />
                  <Picker.Item label="2 Day" value={'2'} />
                  <Picker.Item label="3 Day" value={'3'} />
                  <Picker.Item label="4 Day" value={'4'} />
                  <Picker.Item label="5 Day" value={'5'} />
                  <Picker.Item label="6 Day" value={'6'} />
                  <Picker.Item label="7 Day" value={'7'} />
                </Picker>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <TouchableOpacity style={styles.btnReservation}>
                <Text style={styles.reservation}>Reservation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#ffcd61" />
        </View>
      )}
    </View>
  );
};

export default VehicleDetail;
