import * as helpers from "../_helpers"

export const RECEIVE_DECK = "RECEIVE_DECK"
export const GET_DECK = "GET_DECK"

export const receiveDeck = deck => {
  return {
    type: RECEIVE_DECK,
    deck
  }
}

export const fetchDeck = title => dispatch => {
  helpers.getDeck(title).then(deck => dispatch(receiveDeck(deck)))
}
