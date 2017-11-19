import * as helpers from "../_helpers"

export const RECEIVE_DECK = "RECEIVE_DECK"
export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const GET_DECK = "GET_DECK"

export const receiveDeck = deck => {
  return {
    type: RECEIVE_DECK,
    deck
  }
}

export const receiveDecks = decks => {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export const fetchDecks = () => dispatch => {
  helpers.getDecks().then(decks => dispatch(receiveDecks(decks)))
}

export const fetchDeck = title => dispatch => {
  helpers.getDeck(title).then(deck => dispatch(receiveDeck(deck)))
}

export const addCard = (title, card) => dispatch => {
  helpers
    .addCardToDeck(title, card)
    .then(err => {
      return dispatch(fetchDeck(title))
    })
    .catch(err => console.log(err))
}

export const addDeck = title => dispatch => {
  helpers
    .saveDeckTitle(title)
    .then(err => {
      return dispatch(fetchDeck(title))
    })
    .catch(err => console.log(err))
}
