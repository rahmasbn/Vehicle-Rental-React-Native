/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import avatar from '../../assets/images/avatar.jpg';
import styles from '../../styles/profile';
import {useSelector} from 'react-redux';
import {getProfile} from '../../utils/users';
import {ScrollView} from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Radio, Stack, NativeBaseProvider} from 'native-base';

const UpdateProfile = () => {
  const [userData, setUserData] = useState([]);
  const [profilePic, setProfilePic] = useState(avatar);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [chosenDate, setChosenDate] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const user = useSelector(state => state.auth.userData);

  const getUser = () => {
    const token = user.token;
    const image = user.photo;

    getProfile(token)
      .then(res => {
        if (image !== null) {
          setProfilePic({uri: process.env.HOST + `/${image}`});
        }
        const moment = require('moment');
        let dob = moment(res.data.result[0].dob).format('YYYY-MM-DD');
        const result = {...res.data.result[0], dob};
        setUserData(result);
        setSelectedGender(res.data.result[0].gender_id);
        setIsLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handlePicker = date => {
    const moment = require('moment');
    // eslint-disable-next-line no-sequences
    setVisible(false), setChosenDate(moment(date).format('YYYY-MM-DD'));
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(userData.dob);
  return (
    <NativeBaseProvider>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <>
            <View style={{flexDirection: 'row', marginVertical: '5%'}}>
              <View style={{marginHorizontal: '5%'}}>
                <Image
                  style={styles.profilePic}
                  source={profilePic}
                  onError={() => {
                    setProfilePic(avatar);
                  }}
                />
              </View>
              <View style={styles.btnWrapper}>
                <TouchableOpacity
                  style={{...styles.btnPicture, backgroundColor: '#393939'}}>
                  <Text style={{...styles.inputImg, color: '#ffcd61'}}>
                    Take a picture
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.btnPicture, backgroundColor: '#ffcd61'}}>
                  <Text style={{...styles.inputImg, color: '#393939'}}>
                    Browse from gallery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginVertical: '10%', marginHorizontal: '5%'}}>
              <Text>Name :</Text>
              <KeyboardAvoidingView>
                <TextInput
                  style={styles.inputStyle}
                  defaultValue={userData.name}
                />
              </KeyboardAvoidingView>
              <Radio.Group
                //   style={{margin}}
                name="exampleGroup"
                defaultValue={() => selectedGender !== null && selectedGender}
                onChange={value => setSelectedGender(value)}
                accessibilityLabel="select gender">
                <Stack
                  direction="row"
                  alignItems="center"
                  space={10}
                  mb="3"
                  mt="-2">
                  <Radio value={2} colorScheme="yellow" size="md" my={1}>
                    Female
                  </Radio>
                  <Radio value={1} colorScheme="yellow" size="md" my={1}>
                    Male
                  </Radio>
                </Stack>
              </Radio.Group>
              <Text>Email Address :</Text>
              <KeyboardAvoidingView>
                <TextInput
                  style={styles.inputStyle}
                  defaultValue={userData.email}
                />
              </KeyboardAvoidingView>
              <Text>Phone Number :</Text>
              <KeyboardAvoidingView>
                <TextInput
                  style={styles.inputStyle}
                  defaultValue={userData.phone_number}
                />
              </KeyboardAvoidingView>
              <Text>Date of Birth :</Text>
              <TouchableOpacity
                style={styles.selectDate}
                onPress={() => setVisible(true)}>
                {chosenDate ? (
                  <Text style={styles.date}>{chosenDate}</Text>
                ) : (
                  <Text style={styles.date}>
                    {userData.dob !== 'Invalid date' && userData.dob}
                  </Text>
                )}
              </TouchableOpacity>
              <DateTimePicker
                isVisible={visible}
                mode={'date'}
                onConfirm={handlePicker}
                onCancel={() => setVisible(false)}
              />
              <Text>Delivery Address :</Text>
              <KeyboardAvoidingView>
                <TextInput
                  style={styles.inputStyle}
                  defaultValue={userData.address}
                />
              </KeyboardAvoidingView>
            </View>

            <TouchableOpacity style={styles.btnSave}>
              <Text style={styles.save}>Save Change</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#ffcd61" />
          </View>
        )}
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default UpdateProfile;
