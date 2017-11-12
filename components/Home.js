import React from "react"
import { FlatList } from "react-native"
import { getDecks } from "../_helpers"
import DeckItem from "./DeckItem"
import { Constants } from "expo"

export default class Home extends React.Component {
  state = {
    loading: true,
    decks: []
  }

  componentWillMount() {
    getDecks()
      .then(jsondecks => {
        let decks = []
        Object.entries(JSON.parse(jsondecks)).forEach(([key, deck]) =>
          decks.push(deck)
        )

        this.setState(...this.state, {
          decks,
          loading: false
        })
      })
      .catch(error => console.log(error))
  }

  onItemClick(deck) {
    this.props.navigation.navigate("DeckDetail", { deck })
  }

  renderDeckItem = deck => {
    return (
      <DeckItem
        key={deck.title}
        deck={deck}
        onItemClick={this.onItemClick.bind(this)}
      />
    )
  }

  render() {
    const { decks } = this.state

    return (
      <FlatList
        data={decks}
        extraData={this.state}
        keyExtractor={(deck, index) => deck.title}
        renderItem={this.renderDeckItem}
      />
    )
  }
}
