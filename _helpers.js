import { AsyncStorage } from "react-native"

const DECKS = "FlashCards:Decks"

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS)
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
      let d = JSON.parse(decks)
      d[title].questions.push(card)
      return AsyncStorage.mergeItem(DECKS, JSON.stringify(d))
    })
  } catch (error) {
    console.log(error)
  }
}
