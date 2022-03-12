import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  //   detail
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: width,
    borderBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  backIcon: {
    resizeMode: 'contain',
    width: 30,
    height: 22,
    marginTop: 15,
  },
  title: {
    fontSize: 23,
    color: '#000',
    fontWeight: '600',
    paddingLeft: '5%',
    paddingTop: '3%',
  },
  paymentStatus: {
    textAlign: 'center',
    marginVertical: '7%',
    color: '#087e0d',
    fontWeight: '700',
    fontSize: 22,
  },
  vehicleImg: {
    width: '90%',
    height: 200,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 12,
  },
  desc: {
    fontSize: 16,
    marginBottom: 7,
  },

  //   history
  loader: {
    marginTop: '75%',
  },
  cardWrapper: {
    flexDirection: 'row',
  },
  card: {
    height: 140,
    width: width,
    marginHorizontal: '5%',
    marginTop: '10%',
    flexDirection: 'row',
  },
  cardImg: {
    resizeMode: 'cover',
    height: '80%',
    width: '100%',
    flex: 1,
    borderRadius: 12,
  },
  wrapper: {
    flex: 2,
    marginLeft: '5%',
    // marginTop: 'auto',
  },
  end: {
    textAlign: 'center',
    fontSize: 16,
    color: '#393939',
    marginBottom: '10%',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#393939',
    paddingBottom: 5,
  },
});

export default styles;
