import { AsyncStorage } from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";


const NOTIFICATION_KEY = 'flashcards:notifications';

export function clearLocalNotification(){
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function createNotification(){
    return{
        title: 'Make your quiz',
        body: "Don't forget to learn today!",
        ios: {
            sound: true
        },

    }
}

export function setLocalNotification(){
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
        if(data === null){
            Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({status}) => {
                if(status === 'granted'){
                    Notifications.cancelAllScheduledNotificationsAsync()

                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(20)
                    tomorrow.setMinutes(0)

                    Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        {
                            time: tomorrow,
                            repeat:'day'
                        }
                    )
                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
            })
        }
    })
}