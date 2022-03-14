/* eslint-disable radix */
/* eslint-disable no-sequences */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal as ModalPicker,
  PermissionsAndroid,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Button, NativeBaseProvider, Modal} from 'native-base';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import Toast from 'react-native-toast-message';

import {getDetailVehicle, deleteVehicle} from '../../utils/vehicles';
// import {
//   ModalNative as ModalLogin,
//   ModalNative as ModalDelete,
// } from '../../components/Modal';
import styles from '../../styles/vehicleDetail';

const formatPrice = value => {
  const price = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
    .format(value)
    .replace(/(\.|,)00$/g, '');
  return price;
};
const VehicleDetail = ({navigation, route}) => {
  const auth = useSelector(state => state.auth.userData);
  const [detailVehicle, setDetailVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(1);
  const [visible, setVisible] = useState(false);
  const [chosenDate, setChosenDate] = useState(false);
  const [day, setDay] = useState('1');
  const [imgVehicle, setImgVehicle] = useState(
    require('../../assets/images/default-cars.jpeg'),
  );
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  // const handleClose = () => setShow(false);

  // Update state
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [capacity, setCapacity] = useState(1);
  const [status, setStatus] = useState('');
  const [photo, setPhoto] = useState('');
  const [location, setLocation] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const getDetail = () => {
    const id = route.params.id;

    getDetailVehicle(id)
      .then(res => {
        console.log('detail', res.data.result[0]);
        const image = JSON.parse(res.data.result[0].images);
        // console.log('url', image[0]);
        setImgVehicle({uri: `${process.env.HOST}/${image[0]}`});
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
    setVisible(false), setChosenDate(new Date(date).toISOString().slice(0, 10));
  };

  const onReservation = () => {
    const param = {
      vehicleId: route.params.id,
      vehicleName: detailVehicle.name,
      day: day,
      image: imgVehicle[0],
      qty: counter,
      date: chosenDate,
      totalPrice: counter * detailVehicle.price,
    };
    navigation.navigate('FirstStep', param);
  };

  const openGallery = () => {
    launchImageLibrary({includeBase64: true}, res => {
      // console.log(res);
      if (res.assets[0].uri) {
        setImgVehicle({uri: res.assets[0].uri});
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
            setImgVehicle({uri: res.assets[0].uri});
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

  const editVehicle = () => {
    const id = route.params.id;
    let body = [];
    // console.log('photo', typeof photo.uri);
    if (typeof photo.uri === 'undefined') {
      body.push({
        name: 'imgVehicle',
        data: detailVehicle.images,
      });
    } else {
      body.push({
        name: 'imgVehicle',
        type: photo.type,
        filename: photo.fileName,
        data: RNFetchBlob.wrap(photo.uri),
      });
    }
    if (name === '') {
      body.push({name: 'name', data: detailVehicle.name});
    } else {
      body.push({name: 'name', data: name});
    }
    if (price === 0) {
      body.push({
        name: 'price',
        data: JSON.stringify(parseInt(detailVehicle.price)),
      });
    } else {
      body.push({name: 'price', data: JSON.stringify(parseInt(price))});
    }
    if (capacity === 1) {
      body.push({
        name: 'capacity',
        data: JSON.stringify(parseInt(detailVehicle.capacity)),
      });
    } else {
      body.push({name: 'capacity', data: JSON.stringify(parseInt(capacity))});
    }
    if (location === 0) {
      body.push({
        name: 'city_id',
        data: JSON.stringify(parseInt(detailVehicle.city_id)),
      });
    } else {
      body.push({name: 'city_id', data: JSON.stringify(parseInt(location))});
    }
    if (counter === 1) {
      body.push({
        name: 'stock',
        data: JSON.stringify(parseInt(detailVehicle.stock)),
      });
    } else {
      body.push({name: 'stock', data: JSON.stringify(parseInt(counter))});
    }
    if (status === '') {
      body.push({
        name: 'status',
        data: detailVehicle.status,
      });
    } else {
      body.push({name: 'status', data: status});
    }

    console.log('body', body);
    console.log('image', detailVehicle.images);
    RNFetchBlob.fetch(
      'PATCH',
      `${process.env.HOST}/vehicles/${id}`,
      {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'x-access-token': auth.token,
      },
      body,
    )
      .then(res => {
        console.log('res edit', res.json());
        console.log('size', photo.fileSize);
        console.log('type', photo.type);
        // const image = res.json().result.result.image;
        // dispatch(updateUserPhoto(image));
        getDetail();
        if (res.json().msg === 'Only .png, .jpg and .jpeg format allowed!') {
          Toast.show({
            type: 'error',
            text1: 'Only .png, .jpg and .jpeg format allowed!',
          });
        } else if (res.json().msg === 'File size exceeds the limit') {
          Toast.show({
            type: 'error',
            text1: 'File size exceeds the limit',
          });
        } else {
          setIsEdit(false);
          Toast.show({
            type: 'success',
            text1: 'Data updated Successfully',
          });
        }
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Edit vehicle is failed',
        });
      });
  };

  const deleteData = () => {
    const id = route.params.id;

    deleteVehicle(id, auth.token)
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Data deleted Successfully',
        });
        navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: "Can't delete data",
        });
      });
  };
  useEffect(() => {
    getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        {isLoading ? (
          <>
            <TouchableOpacity
              onPress={() => {
                isEdit ? setModalShow(true) : null;
              }}>
              <ImageBackground
                source={imgVehicle}
                style={styles.img}
                onError={() => {
                  setImgVehicle(
                    require('../../assets/images/default-cars.jpeg'),
                  );
                }}
              />
            </TouchableOpacity>
            <View style={{marginTop: 10}}>
              <View style={styles.wrapper}>
                <View style={styles.left}>
                  {!isEdit ? (
                    <>
                      <Text style={styles.name}>{detailVehicle.name}</Text>
                      <Text style={styles.price}>
                        {formatPrice(detailVehicle.price)}/day
                      </Text>
                    </>
                  ) : (
                    <>
                      <TextInput
                        onChangeText={text => setName(text)}
                        style={{
                          ...styles.name,
                          paddingVertical: -10,
                          marginBottom: 0,
                          marginLeft: -5,
                        }}
                        defaultValue={detailVehicle.name}
                      />
                      <TextInput
                        onChangeText={text => setPrice(text)}
                        style={{
                          ...styles.price,
                          paddingVertical: -10,
                          marginBottom: 0,
                          marginLeft: -5,
                        }}
                        keyboardType="numeric"
                        defaultValue={`${detailVehicle.price}`}
                      />
                    </>
                  )}
                </View>
                {auth.role === 2 && auth.id === detailVehicle.user_id ? (
                  <View style={styles.right}>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: 15,
                        top: 10,
                      }}
                      onPress={deleteData}>
                      {!isEdit && (
                        <View
                          style={{
                            backgroundColor: '#ffcd61',
                            width: 35,
                            height: 35,
                            borderRadius: 35 / 2,
                          }}>
                          <Image
                            source={require('../../assets/icons/delete.png')}
                            style={{position: 'absolute', right: 10, top: 8}}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.right}>
                    <TouchableOpacity style={styles.iconChat}>
                      <Image source={require('../../assets/icons/msg.png')} />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={{marginLeft: '5%', marginBottom: '7%'}}>
                {!isEdit ? (
                  <Text style={{fontSize: 16, fontWeight: '400'}}>
                    Max For {detailVehicle.capacity} Person
                  </Text>
                ) : (
                  <>
                    <View style={{flexDirection: 'row', marginLeft: -5}}>
                      <Text style={{fontSize: 15, marginLeft: 5}}>
                        Capacity :{' '}
                      </Text>
                      <TextInput
                        onChangeText={text => setCapacity(text)}
                        style={{
                          fontSize: 16,
                          fontWeight: '400',
                          paddingVertical: -10,
                          marginTop: -2,
                        }}
                        keyboardType="numeric"
                        defaultValue={`${detailVehicle.capacity}`}
                      />
                    </View>
                  </>
                )}
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    paddingBottom: 3,
                  }}>
                  No Prepayment
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#087e0d',
                  }}>
                  {detailVehicle.status}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginBottom: '5%'}}>
                <Image
                  source={require('../../assets/icons/location.png')}
                  style={styles.icon}
                />
                {!isEdit ? (
                  <Text style={styles.city}>{detailVehicle.city}</Text>
                ) : (
                  <View style={styles.selectCityWrapper}>
                    <Picker
                      style={{color: '#868383', marginTop: -8}}
                      onValueChange={val => setLocation(val)}
                      selectedValue={location}>
                      <Picker.Item value={1} label={'Jakarta'} />
                      <Picker.Item value={2} label={'Yogyakarta'} />
                      <Picker.Item value={3} label={'Bali'} />
                      <Picker.Item value={4} label={'Bandung'} />
                      <Picker.Item value={5} label={'Malang'} />
                      <Picker.Item value={6} label={'Medan'} />
                      <Picker.Item value={7} label={'Bogor'} />
                    </Picker>
                  </View>
                )}
              </View>
              {isEdit && (
                <>
                  <View style={styles.wrapper}>
                    <View style={styles.left}>
                      <Text style={styles.type}>Update stock</Text>
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
                  <View style={styles.selectStatus}>
                    <Picker
                      style={{color: '#868383', marginTop: -3}}
                      onValueChange={val => setStatus(val)}
                      selectedValue={status}>
                      <Picker.Item
                        style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                        label="Update stock status"
                        enabled={false}
                      />
                      <Picker.Item value={'Available'} label={'Available'} />
                      <Picker.Item
                        value={'Full Booked'}
                        label={'Full Booked'}
                      />
                    </Picker>
                  </View>
                </>
              )}

              {auth.role !== 2 && (
                <>
                  <View style={styles.wrapper}>
                    <View style={styles.left}>
                      <Text style={styles.type}>
                        Select {detailVehicle.type}
                      </Text>
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
                    <TouchableOpacity
                      style={styles.btnReservation}
                      onPress={() => {
                        auth.token !== null ? onReservation() : handleShow();
                      }}>
                      <Text style={styles.reservation}>Reservation</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
              {auth.role === 2 && auth.id === detailVehicle.user_id && (
                <>
                  <View style={{marginTop: 20}}>
                    {!isEdit ? (
                      <TouchableOpacity
                        style={styles.btnReservation}
                        onPress={() => setIsEdit(true)}>
                        <Text style={styles.reservation}>Update Item</Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.btnReservation}
                        onPress={editVehicle}>
                        <Text style={styles.reservation}>Update Changes</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </>
              )}
            </View>
          </>
        ) : (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#ffcd61" />
          </View>
        )}
      </View>

      {/* Modal for login */}
      {/* <ModalLogin
        handleClose={handleClose}
        handleShow={handleShow}
        handleNavigate={() => navigation.navigate('Login')}
        title="You Aren't Logged In"
        text="Please login to make a reservation"
      /> */}
      <Modal
        isOpen={show}
        onClose={() => setShow(false)}
        _backdrop={{
          _dark: {
            bg: 'coolGray.800',
          },
          bg: 'warmGray.800',
        }}>
        <Modal.Content maxWidth="350" maxH="212">
          <Modal.CloseButton />
          <Modal.Header>You Aren't Logged In</Modal.Header>
          <Modal.Body>Please login to make a reservation</Modal.Body>
          <Modal.Footer>
            <Button.Group space={5}>
              <Button
                // variant="ghost"
                colorScheme="blueGray"
                onPress={() => setShow(false)}>
                No
              </Button>
              <Button
                colorScheme="yellow"
                onPress={() => navigation.navigate('Login')}>
                Yes
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      {/* Modal upload image */}
      <ModalPicker
        animationType="slide"
        transparent={true}
        visible={modalShow}
        onRequestClose={() => {
          console.log('Modal has been closed');
          setModalShow(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={{...styles.btnWrapper, marginTop: '8%'}}>
              <TouchableOpacity
                style={styles.btnPicker}
                onPress={() => {
                  openCamera();
                  setModalShow(false);
                }}>
                <Text style={styles.textBtn}>Take a Photo</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={styles.btnPicker}
                onPress={() => {
                  openGallery();
                  setModalShow(false);
                }}>
                <Text style={styles.textBtn}>Choose From Gallery</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                style={{...styles.btnPicker, backgroundColor: '#a8a8a8'}}
                onPress={() => setModalShow(false)}>
                <Text style={{...styles.textBtn, color: '#000'}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalPicker>
    </NativeBaseProvider>
  );
};

export default VehicleDetail;
