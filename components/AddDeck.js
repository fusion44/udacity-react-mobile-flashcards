import React from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native"
import { saveDeckTitle } from "../_helpers"

class AddDeck extends React.Component {
  state = {
    title: ""
  }

  render() {
    return (
      <View style={{ margin: 5 }}>
        <Text style={styles.header}>What's the deck title?</Text>
        <TextInput
          style={{ height: 40 }}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            saveDeckTitle(this.state.title).then(err => {
              // TODO replace with a redux action
              this.props.navigation.goBack()
            })
          }}
        >
          <Text>ADD DECK</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  header: {
    width: "100%",
    textAlign: "center",
    fontSize: 25,
    marginBottom: 25
  },
  submitBtn: {
    width: "100%",
    height: 40,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    margin: 5
  }
})
export default AddDeck
