import React from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from "react-native"
import { addCardToDeck } from "../_helpers"

class AddCard extends React.Component {
  state = {
    question: "",
    answer: ""
  }

  render() {
    const { title, onQuestionAdded } = this.props.navigation.state.params
    return (
      <View style={{ margin: 5 }}>
        <Text style={styles.header}>Add question to {title}</Text>
        <Text style={styles.header}>Question</Text>
        <TextInput
          style={{ height: 40 }}
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        />
        <Text style={styles.header}>Answer</Text>
        <TextInput
          style={{ height: 40 }}
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={() => {
            let card = {
              question: this.state.question,
              answer: this.state.answer
            }
            addCardToDeck(title, card).then(err => {
              onQuestionAdded()
              this.props.navigation.goBack()
            })
          }}
        >
          <Text>ADD CARD</Text>
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
export default AddCard
