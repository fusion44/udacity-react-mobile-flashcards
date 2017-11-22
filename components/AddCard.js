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
import { addCard, receiveDeck } from "../actions"
import common from "../common/styles"

class AddCard extends React.Component {
  state = {
    question: "",
    answer: ""
  }

  render() {
    const { title } = this.props.navigation.state.params
    return (
      <View style={{ margin: 5 }}>
        <KeyboardAvoidingView>
          <Text style={styles.header}>Add question to {title}</Text>
          <Text style={styles.header}>Question</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={question => this.setState({ question })}
            value={this.state.question}
          />
          <Text style={styles.header}>Answer</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            let card = {
              question: this.state.question,
              answer: this.state.answer
            }
            this.props.dispatch(addCard(title, card))
            this.props.navigation.goBack()
          }}
        >
          <Text>ADD CARD</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  header: common.header,
  submitBtn: {
    ...common.btn,
    backgroundColor: "lightgreen"
  },
  textInput: {
    height: 40
  }
})

export default connect(null)(AddCard)
