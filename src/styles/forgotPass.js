import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: width,
    height: height,
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 40,
    marginTop: '30%',
    textAlign: 'center',
    // fontFamily: 'Roboto-Regular'
    fontFamily: 'Redressed-Regular',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginTop: '50%',
    fontWeight: '700',
    fontFamily: 'Nunito-Regular',
  },
  email: {
    width: '90%',
    height: 55,
    backgroundColor: 'white',
    marginBottom: '5%',
    marginTop: '5%',
    marginLeft: '5%',
    borderRadius: 6,
    opacity: 0.8,
    paddingLeft: 15,
  },
  btnSend: {
    backgroundColor: '#ffcd61',
    width: '90%',
    marginLeft: '5%',
    marginTop: '3%',
    height: 55,
    borderRadius: 8,
  },
  code: {
    color: '#393939',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'Nunito-Regular',
  },
});

export default styles;
