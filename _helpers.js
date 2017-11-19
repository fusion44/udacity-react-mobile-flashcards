import { AsyncStorage } from "react-native"

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
