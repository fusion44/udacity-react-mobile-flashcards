import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

class DeckItem extends React.PureComponent {
  _onPress = () => {
    this.props.onItemClick(this.props.deck.item)
  }

  render() {
    const deck = this.props.deck.item
    return (
      <TouchableOpacity style={styles.container} onPress={this._onPress}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.subtitle}>{deck.questions.length} cards</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderColor: "lightgrey",
    borderWidth: 2,
    borderRadius: 6,
    margin: 5
  },
  title: {
    fontSize: 25
  },
  subtitle: {
    fontSize: 15
  }
})

export default DeckItem
