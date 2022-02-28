import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import styles from '../../styles/vehicleType';
import {getPopularVehicle} from '../../utils/vehicles';

const Popular = ({navigation, route}) => {
  const [vehicleData, setVehicleData] = useState([]);
  const [isNext, setIsNext] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const formatPrice = value => {
    const price = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    })
      .format(value)
      .replace(/(\.|,)00$/g, '');
    return price;
  };

  const getPopular = () => {
    setIsLoading(true);
    const sort = 'desc';

    getPopularVehicle(currentPage, sort)
      .then(res => {
        // console.log('result', res.data.result.meta.next);
        // setVehicleData(res.data.result.data);
        setIsSuccess(true);
        setVehicleData([...vehicleData, ...res.data.result.data]);
        setIsNext(true);
        setIsLoading(false);
        if (res.data.result.meta.next === null) {
          setIsNext(false);
          setIsLoading(false);
        }
      })
      .catch(err => console.log(err));
  };

  const loadMore = () => {
    return isNext ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ffcd61" />
      </View>
    ) : (
      <Text style={styles.end}>No more vehicles</Text>
    );
  };

  useEffect(() => {
    getPopular();

    return () => getPopular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <View style={styles.container}>
      {vehicleData.length > 0 && isSuccess ? (
        <FlatList
          data={vehicleData}
          showsVerticalScrollIndicator={false}
          renderItem={({item: vehicle}) => {
            return (
              <TouchableOpacity
                style={styles.card}
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
                  style={styles.cardImg}
                />
                <View style={styles.rating}>
                  <Text style={styles.rate}>{vehicle.rating}</Text>
                  <Image
                    source={require('../../assets/icons/star.png')}
                    style={styles.star}
                  />
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.name}>{vehicle.name}</Text>
                  <Text style={styles.capacity}>
                    Max for {vehicle.capacity} person
                  </Text>
                  <Text style={styles.status}>{vehicle.status}</Text>
                  <Text style={styles.price}>
                    {formatPrice(vehicle.price)}/day
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={vehicle => vehicle.id}
          ListFooterComponent={loadMore}
          ListEmptyComponent={() => {
            <View style={styles.empty}>
              <Text>No Data at the moment</Text>
              <Button onPress={() => getPopular()} title="Refresh" />
            </View>;
          }}
          onEndReached={() => {
            isNext && setCurrentPage(currentPage + 1);
          }}
          onEndReachedThreshold={0.2}
        />
      ) : (
        <View style={styles.loadWrapper}>
          <Image
            source={require('../../assets/images/loading.gif')}
            style={styles.loading}
          />
        </View>
      )}
    </View>
  );
};

export default Popular;
