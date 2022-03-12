/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Checkbox, NativeBaseProvider} from 'native-base';

import {getAllTransaction} from '../../utils/transaction';
import styles from '../../styles/history';

const History = ({navigation, route}) => {
  const user = useSelector(state => state.auth.userData);
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const formatPrice = value => {
    const price = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    })
      .format(value)
      .replace(/(\.|,)00$/g, '');
    return price;
  };

  const getHistory = () => {
    setIsLoading(true);

    getAllTransaction(currentPage, user.token)
      .then(res => {
        // console.log(res.data.result.data);
        setIsSuccess(true);
        setHistory(res.data.result.data);
        setIsNext(true);
        setIsLoading(false);
        if (res.data.result.meta.next === null) {
          setIsNext(false);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const loadMore = () => {
    return isNext ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ffcd61" />
      </View>
    ) : (
      <Text style={styles.end}>No more transaction</Text>
    );
  };

  useEffect(() => {
    getHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <>
      {user.token !== null ? (
        <NativeBaseProvider>
          {/* {isLoading ? ( */}
          <View style={styles.container} showsVerticalScrollIndicator={false}>
            {history.length > 0 && isSuccess ? (
              <>
                <Text
                  style={{
                    marginLeft: 'auto',
                    paddingTop: '5%',
                    marginBottom: -15,
                    paddingRight: 7,
                    fontSize: 15,
                  }}>
                  Delete
                </Text>
                <FlatList
                  data={history}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item: data}) => {
                    return (
                      <View style={styles.card}>
                        {/* <TouchableOpacity
                          style={styles.card}
                          onPress={() => {
                            const param = {
                              transactionId: data.id,
                            };
                            // console.log('id', {transactionId: data.id});
                            navigation.navigate('Detail', param);
                          }}> */}
                        <Image
                          source={{
                            uri: `${process.env.HOST}/${
                              JSON.parse(data.images)[0]
                            }`,
                          }}
                          style={styles.cardImg}
                        />
                        <View style={styles.wrapper}>
                          <Text style={styles.name}>{data.vehicle}</Text>
                          <Text
                            style={{
                              paddingBottom: 5,
                              fontSize: 15,
                              color: 'black',
                            }}>
                            {new Date(data.start_date)
                              .toISOString()
                              .slice(0, 10)}{' '}
                            to{' '}
                            {new Date(data.return_date)
                              .toISOString()
                              .slice(0, 10)}
                          </Text>
                          <Text style={styles.name}>
                            Prepayment : {formatPrice(data.price)}
                          </Text>
                          <Text style={{fontSize: 16, color: 'green'}}>
                            {data.status !== null
                              ? data.status
                              : 'Being rented'}
                          </Text>
                        </View>
                        {/* </TouchableOpacity> */}
                        <View
                          style={{
                            position: 'absolute',
                            right: '7%',
                            marginTop: '10%',
                          }}>
                          <Checkbox
                            value="delete"
                            colorScheme="yellow"
                            accessibilityLabel="checkbox"
                          />
                        </View>
                        {/* </> */}
                      </View>
                    );
                  }}
                  keyExtractor={vehicle => vehicle.id}
                  ListFooterComponent={loadMore}
                  ListEmptyComponent={() => {
                    <View style={styles.empty}>
                      <Text>No Data at the moment</Text>
                      <Button onPress={() => getHistory()} title="Refresh" />
                    </View>;
                  }}
                  onEndReached={() => {
                    isNext && setCurrentPage(currentPage + 1);
                  }}
                  onEndReachedThreshold={0.2}
                />
              </>
            ) : (
              // <View style={styles.loader}>
              //   <ActivityIndicator size="large" color="#ffcd61" />
              // </View>
              <Text
                style={{
                  marginTop: '80%',
                  textAlign: 'center',
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                You've never done a transaction so far
              </Text>
            )}
            {/* {history.length === 0 && !isLoading ? (
              <Text
                style={{
                  marginTop: '80%',
                  textAlign: 'center',
                  fontSize: 17,
                  fontWeight: '700',
                }}>
                You've never done a transaction so far
              </Text>
            ) : (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color="#ffcd61" />
              </View>
            )} */}
          </View>
        </NativeBaseProvider>
      ) : null}
    </>
  );
};

export default History;
