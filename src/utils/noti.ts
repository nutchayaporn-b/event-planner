import * as Notifications from "expo-notifications";

export async function schedulePushNotification(title: string, body: string, data: any, seconds: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
    },
    trigger: {
      seconds: seconds,
    },
  });
}
