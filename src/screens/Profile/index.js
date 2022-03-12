import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Modal, NativeBaseProvider} from 'native-base';

import avatar from '../../assets/images/avatar.jpg';
import {getProfile} from '../../utils/users';
import styles from '../../styles/profile';
import {logout} from '../../utils/auth';
import {logoutAction} from '../../redux/actions/auth';

const Profile = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const [profilePic, setProfilePic] = useState(avatar);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const user = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();

  const getUser = () => {
    const token = user.token;
    const image = user.photo;

    getProfile(token)
      .then(res => {
        if (image !== null) {
          setProfilePic({uri: process.env.HOST + `/${image}`});
        }
        setUserData(res.data.result[0]);
        setIsLoading(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onLogout = () => {
    const token = user.token;
    logout(token)
      .then(res => {
        // console.log(res.data);
        dispatch(logoutAction());
        setShow(false);
        navigation.navigate('Home');
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
    <>
      {user.token !== null ? (
        <NativeBaseProvider>
          <View style={styles.container}>
            {isLoading ? (
              <>
                <View style={styles.headerWrapper}>
                  <Image
                    source={profilePic}
                    style={styles.imgUser}
                    onError={() => {
                      setProfilePic(avatar);
                    }}
                  />
                  <Text style={{...styles.name}}>{userData.name}</Text>
                </View>
                <TouchableOpacity style={styles.wrapper}>
                  <Text style={styles.text}>Your favourites</Text>
                  <Image
                    source={require('../../assets/icons/angle-right.png')}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.wrapper}>
                  <Text style={styles.text}>FAQ</Text>
                  <Image
                    source={require('../../assets/icons/angle-right.png')}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.wrapper}>
                  <Text style={styles.text}>Help</Text>
                  <Image
                    source={require('../../assets/icons/angle-right.png')}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.wrapper}
                  onPress={() => {
                    navigation.navigate('UpdateProfile');
                  }}>
                  <Text style={styles.text}>Update profile</Text>
                  <Image
                    source={require('../../assets/icons/angle-right.png')}
                    style={styles.arrow}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.wrapper}
                  onPress={() => {
                    navigation.navigate('UpdatePass');
                  }}>
                  <Text style={styles.text}>Update password</Text>
                  <Image
                    source={require('../../assets/icons/angle-right.png')}
                    style={styles.arrow}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnLogout}
                  onPress={() => setShow(true)}>
                  <Text style={styles.logout}>Log out</Text>
                  <Image
                    source={require('../../assets/icons/arrow.png')}
                    style={styles.arrowIcon}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#ffcd61" />
              </View>
            )}

            <Modal
              // style={{backgroundColor: 'black', opacity: 0.7}}
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
                <Modal.Header>LOGOUT</Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
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
                      onPress={(() => setShow(false), onLogout)}>
                      Yes
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </Modal.Content>
            </Modal>
          </View>
        </NativeBaseProvider>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/icons/left-arrow.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.name}>Back</Text>
          </View>
          <TouchableOpacity
            style={styles.wrapper}
            onPress={() => navigation.push('Login')}>
            <Text style={styles.text}>Login</Text>
            <Image
              source={require('../../assets/icons/angle-right.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.wrapper}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.text}>Sign Up</Text>
            <Image
              source={require('../../assets/icons/angle-right.png')}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default Profile;
