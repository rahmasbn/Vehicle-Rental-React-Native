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
    fontSize: 45,
    marginTop: '20%',
    marginLeft: '5%',
  },
  name: {
    width: '90%',
    height: 55,
    backgroundColor: 'white',
    marginBottom: '3%',
    marginTop: '40%',
    marginLeft: '5%',
    borderRadius: 6,
    opacity: 0.7,
    paddingLeft: 15,
  },
  email: {
    width: '90%',
    height: 55,
    backgroundColor: 'white',
    marginBottom: '3%',
    marginLeft: '5%',
    borderRadius: 6,
    opacity: 0.7,
    paddingLeft: 15,
  },
  password: {
    width: '90%',
    height: 55,
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: '5%',
    borderRadius: 6,
    opacity: 0.7,
    paddingLeft: 15,
  },
  text: {
    color: 'white',
    marginLeft: 20,
    textDecorationLine: 'underline',
  },
  btnSignup: {
    backgroundColor: '#ffcd61',
    width: '90%',
    marginTop: '10%',
    marginLeft: '5%',
    height: 55,
    borderRadius: 8,
  },
  signup: {
    textAlign: 'center',
    marginTop: 'auto',
    color: '#393939',
    marginBottom: 'auto',
    fontWeight: 'bold',
    fontSize: 17,
  },
  login: {
    color: 'white',
    textAlign: 'center',
    marginTop: 60,
  },
  error: {
    fontSize: 15,
    marginHorizontal: '5%',
    color: 'red',
    marginBottom: 10,
    // fontWeight: '700',
  },
});

export default styles;
