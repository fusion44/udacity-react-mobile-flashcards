import React from "react"
import { StyleSheet, Text, View } from "react-native"

export default class App extends React.Component {
  state = {
    decks: {}
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menus.</Text>
        <Text>{JSON.stringify(this.state.decks)}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})
