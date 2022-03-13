import PushNotification from 'react-native-push-notification';

export const sendLocalNotification = ({title, message}) => {
  PushNotification.localNotification({
    channelId: '123',
    // title: 'Payment Successfully',
    title,
    message,
    // message: 'Thank you for renting at vehicle rental',
  });
};
