import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {vehicleType} from '../../utils/vehicles';
import styles from '../../styles/home';

const Home = ({navigation}) => {
  const [popular, setPopular] = useState([]);
  const [cars, setCars] = useState([]);
  const [motorbikes, setMotorbikes] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getVehicleType = () => {
    vehicleType()
      .then(
        axios.spread((...res) => {
          setIsLoading(true);
          setPopular(res[0].data.result.data);
          setCars(res[1].data.result.data);
          setMotorbikes(res[2].data.result.data);
          setBikes(res[3].data.result.data);
        }),
      )
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getVehicleType();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image
        source={require('../../assets/images/bg-home.jpg')}
        style={styles.banner}
      />
      <View style={styles.wrapper}>
        <Text style={styles.title}>Popular</Text>
        <Text
          style={styles.more}
          onPress={() => {
            const param = {
              type: 'Popular',
            };
            navigation.navigate('Popular', param);
          }}>
          View More {'>'}
        </Text>
      </View>
      {popular.length > 0 && isLoading ? (
        <FlatList
          data={popular}
          horizontal={true}
          renderItem={({item: vehicle}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  const param = {
                    id: vehicle.id,
                  };
                  navigation.navigate('Detail', param);
                }}>
                <Image
                  source={{
                    uri: `${process.env.HOST}/${JSON.parse(vehicle.images)[0]}`,
                  }}
                  style={styles.card}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={vehicle => vehicle.id}
        />
      ) : (
        <Image
          source={require('../../assets/images/loading.gif')}
          style={styles.loading}
        />
      )}
      <View style={styles.wrapper}>
        <Text style={styles.title}>Car</Text>
        <Text
          style={styles.more}
          onPress={() => {
            const param = {
              type: 'Car',
            };
            navigation.navigate('Category', param);
          }}>
          View More {'>'}
        </Text>
      </View>
      {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}> */}
      {/* {cars.map(vehicle => {
          return (
            <TouchableOpacity
              onPress={() => {
                const param = {
                  id: vehicle.id,
                };
                navigation.navigate('Detail', param);
              }}>
              <Image
                key={vehicle.id}
                source={{
                  uri: `${process.env.HOST}/${JSON.parse(vehicle.images)[0]}`,
                }}
                style={styles.card}
              />
            </TouchableOpacity>
          );
        })} */}
      {/* </ScrollView> */}
      {cars.length > 0 && isLoading ? (
        <FlatList
          data={cars}
          horizontal={true}
          renderItem={({item: vehicle}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  const param = {
                    id: vehicle.id,
                  };
                  navigation.navigate('Detail', param);
                }}>
                <Image
                  source={{
                    uri: `${process.env.HOST}/${JSON.parse(vehicle.images)[0]}`,
                  }}
                  style={styles.card}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={vehicle => vehicle.id}
        />
      ) : (
        <Image
          source={require('../../assets/images/loading.gif')}
          style={styles.loading}
        />
      )}
      <View style={styles.wrapper}>
        <Text style={styles.title}>Motorbike</Text>
        <Text
          style={styles.more}
          onPress={() => {
            const param = {
              type: 'Motorbike',
            };
            navigation.navigate('Category', param);
          }}>
          View More {'>'}
        </Text>
      </View>
      {motorbikes.length > 0 && isLoading ? (
        <FlatList
          data={motorbikes}
          horizontal={true}
          renderItem={({item: vehicle}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  const param = {
                    id: vehicle.id,
                  };
                  navigation.navigate('Detail', param);
                }}>
                <Image
                  source={{
                    uri: `${process.env.HOST}/${JSON.parse(vehicle.images)[0]}`,
                  }}
                  style={styles.card}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={vehicle => vehicle.id}
        />
      ) : (
        <Image
          source={require('../../assets/images/loading.gif')}
          style={styles.loading}
        />
      )}
      <View style={styles.wrapper}>
        <Text style={styles.title}>Bike</Text>
        <Text
          style={styles.more}
          onPress={() => {
            const param = {
              type: 'Bike',
            };
            navigation.navigate('Category', param);
          }}>
          View More {'>'}
        </Text>
      </View>

      {bikes.length > 0 && isLoading ? (
        <FlatList
          data={bikes}
          horizontal={true}
          renderItem={({item: vehicle}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  const param = {
                    id: vehicle.id,
                  };
                  navigation.navigate('Detail', param);
                }}>
                <Image
                  source={{
                    uri: `${process.env.HOST}/${JSON.parse(vehicle.images)[0]}`,
                  }}
                  style={styles.card}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={vehicle => vehicle.id}
        />
      ) : (
        <Image
          source={require('../../assets/images/loading.gif')}
          style={styles.loading}
        />
      )}
    </ScrollView>
  );
};

export default Home;
