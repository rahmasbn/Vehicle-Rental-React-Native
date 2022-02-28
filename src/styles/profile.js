import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#fff',
  },
  loader: {
    marginTop: '100%',
  },
  imgUser: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 60 / 2,
  },
  headerWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: width,
    elevation: 20,
  },
  name: {
    flex: 1,
    marginLeft: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#393939',
    fontSize: 22,
  },
  wrapper: {
    flexDirection: 'row',
    marginVertical: '6%',
    marginLeft: '5%',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
  arrow: {
    marginLeft: 'auto',
    marginRight: '5%',
    marginTop: 8,
    width: 10,
    height: 17,
    resizeMode: 'cover',
  },
  btnLogout: {
    flexDirection: 'row',
    marginTop: '45%',
    marginHorizontal: '5%',
    backgroundColor: '#ffcd61',
    borderRadius: 8,
    paddingVertical: 15,
  },
  logout: {
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 30,
  },
  arrowIcon: {
    resizeMode: 'contain',
    marginTop: 5,
    width: 30,
    height: 20,
    marginRight: 15,
  },
});

export default styles;
