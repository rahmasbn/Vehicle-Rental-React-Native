/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';

import styles from '../../styles/chat';
import {TextInput} from 'react-native-gesture-handler';

const RoomChat = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.product}>
          <Image
            source={require('../../assets/images/vespa.jpg')}
            style={styles.img}
          />
          <View style={styles.desc}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#000',
                paddingBottom: 5,
              }}>
              Vespa Matic
            </Text>
            <Text style={{color: 'green', fontSize: 15, paddingBottom: 3}}>
              Available
            </Text>
            <Text style={{fontSize: 15, color: '#000', fontWeight: '700'}}>
              Rp. 120.000/day
            </Text>
            <View style={styles.rating}>
              <Text style={styles.rate}>4.5</Text>
              <Image
                source={require('../../assets/icons/star.png')}
                style={styles.star}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            ...styles.chatWrapper,
            backgroundColor: '#393939',
            alignSelf: 'flex-end',
            width: '65%',
          }}>
          <Text style={{color: '#fff'}}>
            Hey, can I book 2 vespa for january 18 to 21?
          </Text>
        </View>
        <Text style={{marginLeft: '30%', marginTop: 5}}>Read [12.04 PM]</Text>
        <View
          style={{
            ...styles.chatWrapper,
            backgroundColor: '#ffcd61',
            marginLeft: '5%',
            width: '77%',
          }}>
          <Text style={{color: '#393939'}}>
            Hey thanks for asking, it's available now you can do reservation and
            pay for the vespa so they're ready for you
          </Text>
        </View>
        <Text style={{marginLeft: '65%', marginTop: 5}}>12.10 PM</Text>
      </ScrollView>
      <View
        style={{
          marginHorizontal: '3%',
          marginBottom: '3%',
          flexDirection: 'row',
        }}>
        <View style={styles.bubble}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 'auto',
              marginBottom: 'auto',
              color: '#000',
            }}>
            Okay, please wait
          </Text>
        </View>
        <View style={styles.bubble}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 'auto',
              marginBottom: 'auto',
              color: '#000',
            }}>
            Thank you!
          </Text>
        </View>
        <View style={styles.bubble}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 'auto',
              marginBottom: 'auto',
              color: '#000',
            }}>
            Your welcome
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: 'auto',
          marginBottom: '5%',
          backgroundColor: 'transparent',
        }}>
        <TextInput placeholder="Type a message" style={styles.input} />
        <Image
          source={require('../../assets/icons/camera-icon.png')}
          style={styles.icon}
        />
      </View>
    </View>
  );
};

export default RoomChat;
