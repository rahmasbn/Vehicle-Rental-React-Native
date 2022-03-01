import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#efefef',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: '5%',
  },
  selectWrapper: {
    height: 50,
    backgroundColor: '#efefef',
    borderColor: '#efefef',
    borderRadius: 10,
    borderWidth: 0,
    marginHorizontal: '5%',
  },
  btnOrder: {
    backgroundColor: '#ffcd61',
    marginHorizontal: '4%',
    height: 60,
    borderRadius: 12,
  },
  order: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#393939',
    fontSize: 20,
    fontWeight: 'bold',
  },

  //  second
  vehicleImg: {
    width: '90%',
    height: '30%',
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 12,
  },
  desc: {
    fontSize: 17,
    marginBottom: 7,
  },
  subTotal: {
    fontSize: 26,
    color: '#393939',
    fontWeight: '700',
  },
});

export default styles;
