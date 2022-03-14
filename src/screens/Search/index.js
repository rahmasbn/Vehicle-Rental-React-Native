/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
// import {debounce} from 'lodash';

import styles from '../../styles/search';
import {Image} from 'react-native';
import {getAllVehicles} from '../../utils/vehicles';

const formatPrice = value => {
  const price = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
    .format(value)
    .replace(/(\.|,)00$/g, '');
  return price;
};

let timeOutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const Search = ({navigation}) => {
  const [vehicleData, setVehicleData] = useState([]);
  // const [isNext, setIsNext] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState('');

  // const getVehicles = text => {
  //   console.log('search', keyword);
  //   setIsLoading(true);

  //   getAllVehicles(text)
  //     .then(res => {
  //       // console.log('result', res.data.result.meta.next);
  //       setVehicleData(res.data.result.data);
  //       // setIsSuccess(true);
  //       // setVehicleData([...vehicleData, ...res.data.result.data]);
  //       // setIsNext(true);
  //       // setIsLoading(false);
  //       // if (res.data.result.meta.next === null) {
  //       //   setIsNext(false);
  //       //   setIsLoading(false);
  //       // }
  //     })
  //     .catch(err => console.log(err));
  // };

  const handleChange = ({nativeEvent}) => {
    const {text} = nativeEvent;
    setKeyword(text);
    debounceSearch(keyword);
  };

  const handleSearch = text => {
    getAllVehicles(text)
      .then(res => {
        setVehicleData(res.data.result.data);
      })
      .catch(err => console.log(err));
  };

  const debounceSearch = debounce(handleSearch, 1000);
  // const loadMore = () => {
  //   return isNext ? (
  //     <View style={styles.loader}>
  //       <ActivityIndicator size="large" color="#ffcd61" />
  //     </View>
  //   ) : (
  //     <Text style={styles.end}>No more vehicles</Text>
  //   );
  // };

  // const handleChange = text => {
  //   setKeyword(text);
  //   getVehicles(keyword);
  // };

  // useEffect(() => {
  //   let search = keyword ? keyword : '';
  //   getVehicles(search);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentPage, keyword]);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Image
          source={require('../../assets/icons/icon-search.png')}
          style={{width: 20, height: 20}}
        />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        onChange={handleChange}
        // onKeyPress={e => e.nativeEvent.key === 'Enter' && handleChange}
      />
      <View style={styles.border}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../assets/icons/filter.png')}
            style={{width: 20, height: 20, marginRight: 10}}
          />
          <Text style={{fontSize: 16}}>Filter</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {vehicleData.length > 0 &&
          !isLoading &&
          vehicleData.map(vehicle => {
            return (
              <TouchableOpacity
                key={vehicle.id}
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
                  onError={() =>
                    require('../../assets/images/default-cars.jpeg')
                  }
                />
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
          })}
      </ScrollView>
    </View>

    // <FlatList
    //   data={vehicleData}
    //   showsVerticalScrollIndicator={false}
    //   renderItem={({item: vehicle}) => {
    //     return (
    //       <TouchableOpacity
    //         style={styles.card}
    //         onPress={() => {
    //           const param = {
    //             id: vehicle.id,
    //           };
    //           navigation.navigate('Detail', param);
    //         }}>
    //         <Image
    //           source={{
    //             uri: `${process.env.HOST}/${JSON.parse(vehicle.images)[0]}`,
    //           }}
    //           style={styles.cardImg}
    //           onError={() =>
    //             require('../../assets/images/default-cars.jpeg')
    //           }
    //         />
    //         <View style={styles.wrapper}>
    //           <Text style={styles.name}>{vehicle.name}</Text>
    //           <Text style={styles.capacity}>
    //             Max for {vehicle.capacity} person
    //           </Text>
    //           <Text style={styles.status}>{vehicle.status}</Text>
    //           <Text style={styles.price}>
    //             {formatPrice(vehicle.price)}/day
    //           </Text>
    //         </View>
    //       </TouchableOpacity>
    //     );
    //   }}
    //   keyExtractor={vehicle => vehicle.id}
    //   // ListFooterComponent={loadMore}
    //   ListEmptyComponent={() => {
    //     <View style={styles.empty}>
    //       <Text>No Data at the moment</Text>
    //       <Button onPress={() => getVehicles()} title="Refresh" />
    //     </View>;
    //   }}
    // onEndReached={() => {
    //   isNext && setCurrentPage(currentPage + 1);
    // }}
    // onEndReachedThreshold={0.2}
    // />
    // )}
  );
};

export default Search;
