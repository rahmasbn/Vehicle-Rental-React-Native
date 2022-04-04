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
    fontSize: 42,
    marginTop: '30%',
    marginLeft: '5%',
  },
  email: {
    width: '90%',
    height: 55,
    backgroundColor: 'white',
    marginBottom: '5%',
    marginTop: '40%',
    marginLeft: '5%',
    borderRadius: 6,
    opacity: 0.8,
    paddingLeft: 15,
    color: '#000',
  },
  password: {
    width: '90%',
    height: 55,
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: '5%',
    borderRadius: 6,
    opacity: 0.8,
    paddingLeft: 15,
  },
  text: {
    color: 'white',
    marginLeft: 20,
    textDecorationLine: 'underline',
  },
  btnLogin: {
    backgroundColor: '#ffcd61',
    width: '90%',
    marginTop: '10%',
    marginLeft: '5%',
    height: 55,
    borderRadius: 8,
  },
  login: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#393939',
  },
  signup: {
    color: 'white',
    textAlign: 'center',
    marginTop: 60,
  },
  error: {
    fontSize: 15,
    marginHorizontal: '5%',
    color: 'red',
    marginBottom: 10,
    fontWeight: '700',
    backgroundColor: '#fff',
    opacity: 0.7,
  },
});

export default styles;
