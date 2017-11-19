import React from "react"
import { View, FlatList } from "react-native"
import { getDecks, clear } from "../_helpers"
import DeckItem from "./DeckItem"
import FAB from "react-native-fab"
import { Constants } from "expo"

export default class Home extends React.Component {
  state = {
    loading: true,
    decks: []
  }

  componentWillMount() {
    this.updateData()
  }

  onDeckAdded() {
    this.updateData()
  }

  updateData() {
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
    this.props.navigation.navigate("DeckDetail", { title: deck.title })
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
      <View style={{ height: "100%" }}>
        <FlatList
          data={decks}
          extraData={this.state}
          keyExtractor={(deck, index) => deck.title}
          renderItem={this.renderDeckItem}
        />
        <FAB
          buttonColor="red"
          iconTextColor="#FFFFFF"
          onClickAction={() => {
            this.props.navigation.navigate("AddDeck", {
              onDeckAdded: this.onDeckAdded.bind(this)
            })
          }}
          visible={true}
        />
      </View>
    )
  }
}
