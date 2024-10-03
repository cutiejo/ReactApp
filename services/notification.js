import PushNotification from 'react-native-push-notification';

export const configurePushNotifications = () => {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
    },
    requestPermissions: true,
  });
};

export const showLocalNotification = (title, message) => {
  PushNotification.localNotification({
    title,
    message,
  });
};
