import React from "react"
import { connect } from "react-redux"
import { Text, View, FlatList } from "react-native"
import DeckItem from "./DeckItem"
import FAB from "react-native-fab"
import { Constants } from "expo"
import { fetchDecks } from "../actions"

class Home extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchDecks())
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
    const { loading, decks } = this.props

    return (
      <View style={{ height: "100%" }}>
        {loading ? (
          <Text>Loading ...</Text>
        ) : (
          <FlatList
            data={decks}
            extraData={this.state}
            keyExtractor={(deck, index) => deck.title}
            renderItem={this.renderDeckItem}
          />
        )}

        <FAB
          buttonColor="red"
          iconTextColor="#FFFFFF"
          onClickAction={() => {
            this.props.navigation.navigate("AddDeck")
          }}
          visible={true}
        />
      </View>
    )
  }
}

function mapStateToProps({ decks }, ownProps) {
  let deckList = []
  Object.entries(decks.decks).forEach(([key, deck]) => deckList.push(deck))

  if (Object.keys(decks.decks).length === 0) {
    return {
      decks: [],
      loading: true
    }
  } else {
    return {
      decks: deckList,
      loading: false
    }
  }
}

export default connect(mapStateToProps)(Home)
