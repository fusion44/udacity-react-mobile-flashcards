import { RECEIVE_DECK, RECEIVE_DECKS } from "../actions/types"

const decks = (state = { decks: {} }, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return { decks: action.decks }
    case RECEIVE_DECK:
      let newDecks = { ...state.decks }
      newDecks[action.deck.title] = action.deck
      return { decks: newDecks }
    default:
      return state
  }
}

export default decks
