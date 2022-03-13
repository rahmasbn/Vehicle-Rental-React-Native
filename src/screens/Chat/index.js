/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import styles from '../../styles/chat';

const Chat = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('RoomChat')}>
        <View style={styles.wrapper}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.name}>Vespa Rental Jogja</Text>
            <Text>2 hours ago</Text>
          </View>
          <Text style={{color: '#000'}}>How many vespa left?</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: 2,
          backgroundColor: '#efefef',
          marginHorizontal: '5%',
        }}
      />
      <View style={styles.wrapper}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.name}>Car Rental</Text>
          <Text>yesterday</Text>
        </View>
        <Text style={{color: '#000'}}>
          Okay, thank you for the good service
        </Text>
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: '#efefef',
          marginHorizontal: '5%',
        }}
      />
      <View style={styles.wrapper}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.name}>Car Rental</Text>
          <Text>yesterday</Text>
        </View>
        <Text style={{color: '#000'}}>
          Okay, thank you for the good service
        </Text>
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: '#efefef',
          marginHorizontal: '5%',
        }}
      />
      <Text style={{textAlign: 'center', marginTop: '30%'}}>
        You have no conversation left
      </Text>
    </View>
  );
};

export default Chat;
