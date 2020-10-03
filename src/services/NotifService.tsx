import { Platform } from "react-native";

var PushNotification = require("react-native-push-notification");
const CATEGORY_EVENT = 'event';

export default class NotifServices {
    constructor() {
        PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function (token: any) {
                console.log("TOKEN:", token);
            },
            // (required) Called when a remote or local notification is opened or received
            onNotification: function (notification: any) {
                console.log("NOTIFICATION:", notification);
                // process the notification
                // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // senderID: "YOUR FCM SENDER ID",
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: Platform.OS === 'ios',
        });
    }

    pushNotification = (values: any) => {
        PushNotification.localNotification({
            allowWhileIdle: true,
            largeIcon: "ic_launcher",
            smallIcon: "iman_icon",
            // soundName: 'point_blank.mp3',
            group: CATEGORY_EVENT,
            title: values.title, // (optional)
            message: values.message, // (required)
            bigText: "Para tener un día más productivo y mayor oportunidad de obtener dinero, enciende tu imán.", // (optional) default: "message" prop
            subText: "¡Enciende tu Imán!", // (optional) default: none

        });
    }

    localSchedule = () => {
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            allowWhileIdle: true,
            largeIcon: "ic_launcher",
            smallIcon: "iman_icon",
            // soundName: 'point_blank.mp3',
            title: 'Imán de Dinero',
            message: '¿Como va tu día?',
            bigText: "Para tener un día más productivo y mayor oportunidad de obtener dinero, enciende tu imán.", // (optional) default: "message" prop
            subText: "¡Enciende tu Imán!", // (optional) default: none
            date: new Date(Date.now() + 7.2e+6), // 2 horas despues
        });
    }

    cancelLocalNotification = (id: string) => {
        PushNotification.cancelLocalNotifications({ id: '123' });
    }

    cancelAllLocalNotification = () => {
        PushNotification.cancelAllLocalNotifications();
    }
}