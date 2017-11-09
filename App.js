import React from "react"
import { StyleSheet, Text, View, StatusBar, FlatList } from "react-native"
import { getDecks } from "./_helpers"
import DeckItem from "./components/DeckItem"
import { Constants } from "expo"

const AppStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
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

  onItemClick(title) {}

  renderDeckItem = deck => {
    return (
      <DeckItem key={deck.title} deck={deck} onItemClick={this.onItemClick} />
    )
  }

  render() {
    const { decks } = this.state

    return (
      <View style={styles.container}>
        <AppStatusBar backgroundColor="blue" barStyle="light-content" />
        <FlatList
          data={decks}
          extraData={this.state}
          keyExtractor={(deck, index) => deck.title}
          renderItem={this.renderDeckItem}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
