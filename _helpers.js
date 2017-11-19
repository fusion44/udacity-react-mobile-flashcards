import { AsyncStorage } from "react-native"
import { Notifications, Permissions } from "expo"

const DECKS = "FlashCards:Decks"

export const clear = () => {
  return AsyncStorage.clear()
}

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS).then(results => {
    return JSON.parse(results)
  })
}

export const getDeck = title => {
  return AsyncStorage.getItem(DECKS).then(results => {
    return JSON.parse(results)[title]
  })
}

export const saveDeckTitle = title => {
  try {
    let deck = {}
    deck[title] = { title, questions: [] }
    return AsyncStorage.mergeItem(DECKS, JSON.stringify(deck))
  } catch (error) {
    console.log(error)
  }
}

export const addCardToDeck = (title, card) => {
  try {
    return getDecks().then(decks => {
      decks[title].questions.push(card)
      return AsyncStorage.mergeItem(DECKS, JSON.stringify(decks))
    })
  } catch (error) {
    console.log(error)
  }
}

function createNotification() {
  return {
    title: "Flash today!",
    body: "Don't forget to learn your cards today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
    Notifications.cancelAllScheduledNotificationsAsync().then(() => {
      if (status === "granted") {
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(20)
        tomorrow.setMinutes(0)
        let repeat = "day"

        // set testNotifications to true to generate a notifications in 30 seconds
        let testNotifications = false
        if (testNotifications) {
          tomorrow = new Date(new Date().getTime() + 30 * 1000)
          repeat = "minute"
        }

        Notifications.scheduleLocalNotificationAsync(createNotification(), {
          time: tomorrow,
          repeat
        })
          .then(ret => {
            console.log("id: ", ret)
          })
          .catch(err => {
            console.log("error: ", err)
          })
      }
    })
  })
}
