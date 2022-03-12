import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#fff',
  },
  Img: {
    width: 160,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 160 / 2,
  },
  add: {
    width: 50,
    height: 50,
    backgroundColor: '#ffcd61',
    borderRadius: 25,
    position: 'absolute',
    top: 185,
    right: 100,
  },
  inputStyle: {
    borderBottomWidth: 2,
    borderBottomColor: '#e5e5e5',
    marginBottom: 15,
    marginTop: -5,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: '#393939',
  },
  selectWrapper: {
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#efefef',
    borderRadius: 10,
    borderWidth: 2,
    marginVertical: '5%',
  },
  stock: {
    flex: 1,
    paddingTop: 10,
  },
  counterWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: '2%',
    justifyContent: 'space-around',
    marginRight: '-5%',
  },
  btnCounter: {
    backgroundColor: '#ffcd61',
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  sub: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  plus: {
    textAlign: 'center',
    paddingLeft: 1,
    paddingTop: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  counter: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    paddingTop: 1,
  },
  btnSave: {
    backgroundColor: '#ffcd61',
    height: 60,
    borderRadius: 12,
  },
  save: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#393939',
    fontSize: 20,
    fontWeight: 'bold',
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
  name: {
    flex: 1,
    marginLeft: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#393939',
    fontSize: 20,
    paddingTop: 2,
    fontFamily: 'Redressed-Regular',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 16,
    // padding: 75,
    width: '90%',
    height: '33%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  btnWrapper: {
    marginTop: '5%',
    width: '80%',
  },
  btnPicker: {
    backgroundColor: '#e5e5e5',
    borderRadius: 8,
    paddingVertical: 15,
  },
  textBtn: {
    textAlign: 'center',
    color: '#393939',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default styles;
