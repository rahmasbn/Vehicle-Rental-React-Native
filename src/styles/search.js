import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: '100%',
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#e5e5e5',
    marginHorizontal: '5%',
    paddingLeft: 40,
    borderRadius: 10,
    marginVertical: '5%',
  },
  iconWrapper: {
    position: 'absolute',
    left: 30,
    top: 33,
    zIndex: 13,
  },
  border: {
    borderColor: '#e5e5e5',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 15,
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
});

export default styles;
