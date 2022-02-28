import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rpm from 'redux-promise-middleware';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const pReducer = persistReducer(persistConfig, rootReducer);
const enhancers = applyMiddleware(rpm, logger);

export const store = createStore(pReducer, enhancers);
export const persistor = persistStore(store);
