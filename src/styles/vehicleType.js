import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  loading: {
    width: '100%',
    height: '40%',
    marginTop: '50%',
  },
  loadWrapper: {
    height: height,
    width: width,
    backgroundColor: '#fff',
  },
  cardWrapper: {
    flexDirection: 'row',
  },
  card: {
    height: 140,
    width: width,
    marginHorizontal: '5%',
    marginTop: '5%',
    marginBottom: '3%',
    flexDirection: 'row',
  },
  cardImg: {
    resizeMode: 'cover',
    height: '95%',
    width: '100%',
    flex: 1,
    borderRadius: 12,
  },
  wrapper: {
    flex: 2,
    marginLeft: '5%',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  loader: {
    marginVertical: 10,
  },
  end: {
    textAlign: 'center',
    fontSize: 16,
    color: '#393939',
    marginVertical: '5%',
  },
  empty: {
    textAlign: 'center',
    fontSize: 15,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#393939',
    paddingBottom: 7,
  },
  capacity: {
    color: '#393939',
    fontSize: 15,
    paddingBottom: 2,
  },
  status: {
    color: '#087e0d',
    fontSize: 15,
    paddingBottom: 10,
  },
  price: {
    color: '#393939',
    fontSize: 16,
    fontWeight: '600',
  },
  rating: {
    position: 'absolute',
    left: 72,
    top: -8,
    width: 58,
    height: 27,
    // backgroundColor: '#f3bd0f',
    backgroundColor: '#ffcd61',
    flexDirection: 'row',
    borderRadius: 13,
  },
  star: {
    width: 18,
    height: 18,
    resizeMode: 'cover',
    marginLeft: 5,
    marginTop: 3,
  },
  rate: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 7,
    paddingTop: 2,
  },
});

export default styles;
