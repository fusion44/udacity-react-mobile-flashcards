import { RECEIVE_DECK } from "../actions"

const decks = (state = { decks: {} }, action) => {
  switch (action.type) {
    case RECEIVE_DECK:
      let newDecks = { ...state.decks }
      newDecks[action.deck.title] = action.deck
      return { decks: newDecks }
    default:
      return state
  }
}

export default decks
