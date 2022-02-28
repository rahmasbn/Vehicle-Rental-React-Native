import {combineReducers} from 'redux';
import authReducer from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({
  auth: authReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'AUTH_LOGOUT') {
    AsyncStorage.removeItem('persist:root');

    state = undefined;
  }
  return reducers(state, action);
};

export default rootReducer;
