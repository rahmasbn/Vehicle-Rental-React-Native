/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Radio, Stack, NativeBaseProvider} from 'native-base';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-toast-message';

import avatar from '../../assets/images/avatar.jpg';
import styles from '../../styles/profile';
import {useSelector, useDispatch} from 'react-redux';
import {getProfile} from '../../utils/users';
import {updateUserPhoto} from '../../redux/actions/auth';

const UpdateProfile = () => {
  const [userData, setUserData] = useState([]);
  const [profilePic, setProfilePic] = useState(avatar);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [chosenDate, setChosenDate] = useState('');
  const [selectedGender, setSelectedGender] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState('');
  const user = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  const getUser = () => {
    const token = user.token;
    // const image = user.photo;

    getProfile(token)
      .then(res => {
        const image = res.data.result[0].image;
        if (image !== null && typeof image !== 'undefined') {
          setProfilePic({uri: process.env.HOST + `/${image}`});
        }
        let dob = new Date(res.data.result[0].dob).toISOString().slice(0, 10);
        const result = {...res.data.result[0], dob};
        setUserData(result);
        setSelectedGender(res.data.result[0].gender_id);
        setChosenDate(dob);
        setIsLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handlePicker = date => {
    // eslint-disable-next-line no-sequences
    setVisible(false), setChosenDate(new Date(date).toISOString().slice(0, 10));
  };

  const openGallery = () => {
    launchImageLibrary({includeBase64: true}, res => {
      // console.log(res.assets[0].uri);
      if (res.assets[0]) {
        setProfilePic({uri: res.assets[0].uri});
        setPhoto(res.assets[0]);
      }
    });
  };

  const openCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Camera permission given');
        const option = {
          mediaType: 'photo',
          quality: 1,
        };

        launchCamera(option, res => {
          if (res.didCancel) {
            console.log('user cancelled image picker');
          } else if (res.errorCode) {
            console.log(res.errorMessage);
          } else {
            setProfilePic({uri: res.assets[0].uri});
            setPhoto(res.assets[0]);
          }
        });
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const editProfile = () => {
    let body = [];
    // console.log('photo', typeof photo.uri);
    if (typeof photo.uri === 'undefined') {
      body.push({
        name: 'image',
        data: userData.image,
      });
    } else {
      body.push({
        name: 'image',
        type: photo.type,
        filename: photo.fileName,
        data: RNFetchBlob.wrap(photo.uri),
      });
    }
    if (name === '') {
      body.push({name: 'name', data: userData.name});
    } else {
      body.push({name: 'name', data: name});
    }
    if (email === '') {
      body.push({name: 'email', data: userData.email});
    } else {
      body.push({name: 'email', data: email});
    }
    if (chosenDate !== null) {
      body.push({name: 'dob', data: chosenDate});
    }
    if (selectedGender !== null) {
      body.push({name: 'gender_id', data: JSON.stringify(selectedGender)});
    }
    if (address === '') {
      body.push({name: 'address', data: userData.address});
    } else {
      body.push({name: 'address', data: address});
    }
    if (phone === '') {
      body.push({name: 'phone_number', data: userData.phone_number});
    } else {
      body.push({name: 'phone_number', data: phone});
    }
    console.log('body', body);
    RNFetchBlob.fetch(
      'PATCH',
      `${process.env.HOST}/users/profile`,
      {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'x-access-token': user.token,
      },
      body,
    )
      .then(res => {
        console.log('res edit', res.json().result);
        console.log('size', photo.fileSize);
        getUser();
        if (
          res.json().result.msg === 'Only .png, .jpg and .jpeg format allowed!'
        ) {
          Toast.show({
            type: 'error',
            text1: 'Only .png, .jpg and .jpeg format allowed!',
          });
        } else if (res.json().result.msg === 'File size exceeds the limit') {
          Toast.show({
            type: 'error',
            text1: 'File size exceeds the limit',
          });
        } else {
          const image = res.json().result.result.image;
          dispatch(updateUserPhoto(image));
          Toast.show({
            type: 'success',
            text1: 'Profile updated Successfully',
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  style={{...styles.btnPicture, backgroundColor: '#393939'}}
                  onPress={openCamera}>
                  <Text style={{...styles.inputImg, color: '#ffcd61'}}>
                    Take a picture
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.btnPicture, backgroundColor: '#ffcd61'}}
                  onPress={openGallery}>
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
                  onChangeText={text => setName(text)}
                />
              </KeyboardAvoidingView>
              <Radio.Group
                //   style={{margin}}
                name="radio"
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
                  onChangeText={text => setEmail(text)}
                />
              </KeyboardAvoidingView>
              <Text>Phone Number :</Text>
              <KeyboardAvoidingView>
                <TextInput
                  style={styles.inputStyle}
                  defaultValue={userData.phone_number}
                  keyboardType="number-pad"
                  onChangeText={text => setPhone(text)}
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
                  onChangeText={text => setAddress(text)}
                />
              </KeyboardAvoidingView>
            </View>

            <TouchableOpacity style={styles.btnSave} onPress={editProfile}>
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
