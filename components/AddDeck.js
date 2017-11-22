import React from "react"
import { connect } from "react-redux"
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native"
import { addDeck } from "../actions"

class AddDeck extends React.Component {
  state = {
    title: ""
  }

  render() {
    return (
      <View style={{ margin: 5 }}>
        <KeyboardAvoidingView>
          <Text style={styles.header}>What's the deck title?</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            this.props.dispatch(addDeck(this.state.title))
            this.props.navigation.goBack()
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
  },
  textInput: {
    height: 40
  }
})

export default connect(null)(AddDeck)
