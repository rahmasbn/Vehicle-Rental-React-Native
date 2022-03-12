/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-toast-message';

import styles from '../../styles/addVehicle';
import addImg from '../../assets/images/add-item.png';
import {useSelector} from 'react-redux';

const AddVehicle = ({navigation}) => {
  const [type, setType] = useState(0);
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState(0);
  const [counter, setCounter] = useState(1);
  const [vehicleImg, setVehicleImg] = useState(addImg);
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [capacity, setCapacity] = useState(1);
  const [show, setShow] = useState(false);
  const user = useSelector(state => state.auth.userData);

  const openGallery = () => {
    launchImageLibrary({includeBase64: true}, res => {
      // console.log(res);
      if (res.assets[0].uri) {
        setVehicleImg({uri: res.assets[0].uri});
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
            setVehicleImg({uri: res.assets[0].uri});
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

  const handleSubmit = () => {
    RNFetchBlob.fetch(
      'POST',
      `${process.env.HOST}/vehicles`,
      {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'x-access-token': user.token,
      },
      [
        {
          name: 'imgVehicle',
          type: photo.type,
          filename: photo.fileName,
          data: RNFetchBlob.wrap(photo.uri),
        },
        {
          name: 'name',
          data: name,
        },
        {
          name: 'price',
          data: JSON.stringify(parseInt(price)),
        },
        {
          name: 'capacity',
          data: JSON.stringify(parseInt(capacity)),
        },
        {
          name: 'status',
          data: status,
        },
        {
          name: 'stock',
          data: JSON.stringify(counter),
        },
        {
          name: 'type_id',
          data: JSON.stringify(type),
        },
        {
          name: 'city_id',
          data: JSON.stringify(location),
        },
      ],
    )
      .then(res => {
        console.log('res add vehicle', res.json().result);
        console.log('size', photo.fileSize);
        Toast.show({
          type: 'success',
          text1: 'Data added Successfully',
        });
        navigation.navigate('Detail', {id: res.json().result.data.id});
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Add vehicle is failed',
        });
      });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/icons/left-arrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.name}>Add new item</Text>
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 20,
          top: 20,
        }}>
        <Text style={{color: 'gray', fontSize: 15}}>Cancel</Text>
      </TouchableOpacity>
      <View style={{alignSelf: 'center', marginTop: 20}}>
        <Image source={vehicleImg} style={styles.Img} />
      </View>
      <TouchableOpacity style={styles.add} onPress={() => setShow(true)}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 35,
            fontWeight: '600',
            color: 'black',
          }}>
          +
        </Text>
      </TouchableOpacity>
      <View style={{marginVertical: '15%', marginHorizontal: '5%'}}>
        <KeyboardAvoidingView>
          <Text style={styles.label}>Name </Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Input the product name min. 30 characters"
            onChangeText={text => setName(text)}
          />
          <Text style={styles.label}>Price </Text>
          <TextInput
            style={styles.inputStyle}
            keyboardType="numeric"
            placeholder="Input the product price"
            onChangeText={text => setPrice(text)}
          />
          <Text style={styles.label}>Capacity </Text>
          <TextInput
            style={styles.inputStyle}
            keyboardType="numeric"
            placeholder="Input the product capacity"
            onChangeText={text => setCapacity(text)}
          />
        </KeyboardAvoidingView>
        <Text style={styles.label}>Status </Text>
        <View style={styles.selectWrapper}>
          <Picker
            style={{color: '#868383'}}
            onValueChange={val => setStatus(val)}
            selectedValue={status}>
            <Picker.Item
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
              }}
              label="Select status"
              enabled={false}
            />
            <Picker.Item value={'Available'} label={'Available'} />
            <Picker.Item value={'Full Booked'} label={'Full Booked'} />
          </Picker>
        </View>
        <Text style={styles.label}>Location</Text>
        <View style={styles.selectWrapper}>
          <Picker
            style={{color: '#868383'}}
            onValueChange={val => setLocation(val)}
            selectedValue={location}>
            <Picker.Item
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
              }}
              label="Select Location"
              enabled={false}
            />
            <Picker.Item value={1} label={'Jakarta'} />
            <Picker.Item value={2} label={'Yogyakarta'} />
            <Picker.Item value={3} label={'Bali'} />
            <Picker.Item value={4} label={'Bandung'} />
            <Picker.Item value={5} label={'Malang'} />
            <Picker.Item value={6} label={'Medan'} />
            <Picker.Item value={7} label={'Bogor'} />
          </Picker>
        </View>
        <Text style={styles.label}>Add to </Text>
        <View style={styles.selectWrapper}>
          <Picker
            style={{color: '#868383'}}
            onValueChange={val => setType(val)}
            selectedValue={type}>
            <Picker.Item
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
              }}
              label="Select category"
              enabled={false}
            />
            <Picker.Item value={1} label={'Car'} />
            <Picker.Item value={2} label={'Motorbike'} />
            <Picker.Item value={3} label={'Bike'} />
          </Picker>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{...styles.stock, ...styles.label}}>
            Available Stock
          </Text>
          <View style={styles.counterWrapper}>
            <TouchableOpacity
              style={styles.btnCounter}
              onPress={() => setCounter(counter - 1 < 1 ? 1 : counter - 1)}>
              <Text style={styles.sub}>-</Text>
            </TouchableOpacity>
            <Text style={styles.counter}>{counter}</Text>
            <TouchableOpacity
              style={styles.btnCounter}
              onPress={() => setCounter(counter + 1)}>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: '15%'}}>
          <TouchableOpacity style={styles.btnSave} onPress={handleSubmit}>
            <Text style={styles.save}>Save product</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          console.log('Modal has been closed');
          setShow(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={{...styles.btnWrapper, marginTop: '8%'}}>
              <TouchableOpacity
                style={styles.btnPicker}
                onPress={() => {
                  openCamera();
                  setShow(false);
                }}>
                <Text style={styles.textBtn}>Take a Photo</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={styles.btnPicker}
                onPress={() => {
                  openGallery();
                  setShow(false);
                }}>
                <Text style={styles.textBtn}>Choose From Gallery</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={{...styles.btnPicker, backgroundColor: '#a8a8a8'}}
                onPress={() => setShow(false)}>
                <Text style={{...styles.textBtn, color: '#000'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default AddVehicle;
