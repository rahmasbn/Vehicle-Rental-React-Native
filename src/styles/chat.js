import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: width,
    height: '100%',
    backgroundColor: '#fff',
  },
  wrapper: {
    marginHorizontal: '5%',
    marginVertical: '7%',
  },
  name: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    paddingBottom: 10,
  },

  //  roomchat
  product: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '90%',
    height: 130,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '8%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 13,
  },
  img: {
    width: '50%',
    height: '100%',
    flex: 1,
    borderRadius: 13,
  },
  desc: {
    flex: 1,
    marginTop: 10,
    marginLeft: 12,
  },
  rating: {
    width: 58,
    height: 27,
    backgroundColor: '#ffcd61',
    flexDirection: 'row',
    borderRadius: 13,
    alignSelf: 'flex-end',
    marginEnd: 10,
    marginTop: 8,
  },
  star: {
    width: 18,
    height: 18,
    resizeMode: 'cover',
    marginLeft: 5,
    marginTop: 3,
  },
  rate: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 7,
    paddingTop: 2,
  },
  chatWrapper: {
    padding: 15,
    paddingLeft: 20,
    borderRadius: 12,
    marginTop: '7%',
    marginRight: '5%',
  },
  input: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: '5%',
    paddingLeft: 15,
    borderRadius: 10,
  },
  icon: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: 35,
    bottom: 10,
  },
  bubble: {
    backgroundColor: '#f5f5f5',
    width: 130,
    height: 40,
    borderWidth: 1,
    borderRadius: 17,
    flex: 1,
    marginRight: 10,
  },
});

export default styles;
