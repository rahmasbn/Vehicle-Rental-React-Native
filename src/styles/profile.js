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
    fontFamily: 'Redressed-Regular',
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
  backIcon: {
    resizeMode: 'contain',
    width: 30,
    height: 22,
    marginTop: 5,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 13,
    paddingHorizontal: 15,
    width: width,
    borderBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  // update profile
  btnWrapper: {
    flex: 1,
    marginLeft: '2%',
  },
  profilePic: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 120 / 2,
  },
  btnPicture: {
    marginVertical: 5,
    width: 180,
    paddingVertical: 13,
    borderRadius: 12,
  },
  inputImg: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  inputStyle: {
    borderBottomWidth: 2,
    borderBottomColor: '#e5e5e5',
    marginBottom: 15,
    marginTop: -5,
  },
  btnSave: {
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: '#ffcd61',
    marginHorizontal: '5%',
    marginBottom: 20,
    marginTop: -5,
  },
  save: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#393939',
  },
  selectDate: {
    height: 45,
    borderBottomWidth: 2,
    borderBottomColor: '#e5e5e5',
    marginBottom: 15,
  },
  date: {
    paddingVertical: 10,
    paddingLeft: 5,
    color: 'black',
  },
});

export default styles;
