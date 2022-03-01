import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: '#fff',
  },
  img: {
    width: width,
    height: 230,
    resizeMode: 'cover',
  },
  loader: {
    marginTop: '100%',
  },
  wrapper: {
    flexDirection: 'row',
  },
  left: {
    flex: 2,
    marginLeft: '5%',
    marginVertical: '3%',
  },
  right: {
    flex: 1,
  },
  name: {
    fontSize: 23,
    color: '#393939',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 20,
    color: '#393939',
    fontWeight: '600',
  },
  iconChat: {
    position: 'absolute',
    right: 0,
  },
  icon: {
    marginHorizontal: '5%',
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  city: {
    fontSize: 15,
    paddingTop: 10,
  },
  type: {
    fontWeight: 'bold',
    color: '#393939',
    fontSize: 16,
  },
  counterWrapper: {
    flexDirection: 'row',
    marginVertical: '2%',
    justifyContent: 'space-around',
    marginRight: '5%',
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
  add: {
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
  selectDate: {
    width: 180,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#efefef',
  },
  date: {
    paddingLeft: '10%',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#868383',
  },
  selectDay: {
    color: '#868383',
    width: 120,
  },
  selectWrapper: {
    height: 50,
    backgroundColor: '#efefef',
    borderColor: '#efefef',
    borderRadius: 10,
    borderWidth: 0,
    marginRight: '7%',
    marginVertical: 20,
  },
  btnReservation: {
    backgroundColor: '#ffcd61',
    marginHorizontal: '4%',
    height: 60,
    borderRadius: 12,
  },
  reservation: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#393939',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
