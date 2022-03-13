import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import Router from './src/Router';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import Toast from 'react-native-toast-message';
import PushNotification from 'react-native-push-notification';

// const toastConfig = {
//   success: props => {
//     <BaseToast
//       {...props}
//       style={{backgroundColor: 'pink'}}
//       text1Style={{
//         fontSize: 15,
//         fontWeight: '400',
//       }}
//     />;
//   },
// };
PushNotification.configure({
  onNotification: notification => {
    console.log('NOTIFICATION', notification);
  },
  popInitialNotification: true,
  requestPermissions: false,
});

PushNotification.createChannel(
  {
    channelId: '123',
    channelName: 'primary-notification',
  },
  created => console.log(`create channel return ${created}`),
);

const AppWithNavAndRedux = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      <Toast />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppWithNavAndRedux);
