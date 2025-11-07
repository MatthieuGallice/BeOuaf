import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const registerForPushNotificationsAsync = async () => {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Impossible d\'activer les notifications');
      return;
    }
  }

  return token;
};

export const scheduleMedicamentNotification = async (
  medicamentNom: string,
  date: Date
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Rappel médicament 💊',
      body: `Il est temps de donner ${medicamentNom}`,
      data: { medicamentNom },
    },
    trigger: date,
  });
};

export const scheduleRendezVousNotification = async (
  motif: string,
  date: Date
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Rendez-vous vétérinaire 🏥',
      body: `Rappel: ${motif}`,
      data: { motif },
    },
    trigger: date,
  });
};
