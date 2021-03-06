import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  banner: {
    width: width,
    height: 220,
  },
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    color: '#393939',
    marginTop: '4%',
    marginLeft: '5%',
    flex: 1,
  },
  more: {
    fontSize: 14,
    fontWeight: '700',
    color: '#393939',
    marginVertical: '6%',
    marginRight: '5%',
  },
  card: {
    width: 250,
    height: 180,
    borderRadius: 12,
    marginLeft: 15,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  loading: {
    width: 250,
    height: 180,
    marginLeft: 50,
  },
  btnAdd: {
    backgroundColor: '#ffcd61',
    height: 55,
    width: '80%',
    borderRadius: 12,
    position: 'absolute',
    top: 110,
    left: 35,
  },
  add: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    color: '#393939',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
