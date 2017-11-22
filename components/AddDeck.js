import React from "react"
import { NavigationActions } from "react-navigation"
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
import common from "../common/styles"

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
            this.props.dispatch(addDeck(this.state.title)).then(() => {
              // This is absolutely not optimal but necessary until
              // a replace function is implemented to react-navigation
              // This will surpress animating into the detail screen...
              // https://github.com/react-community/react-navigation/issues/295
              let resetAction = NavigationActions.reset({
                index: 1,
                actions: [
                  NavigationActions.navigate({ routeName: "Home" }),
                  NavigationActions.navigate({
                    routeName: "DeckDetail",
                    params: {
                      title: this.state.title
                    }
                  })
                ]
              })

              this.props.navigation.dispatch(resetAction)
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
  header: common.header,
  submitBtn: {
    ...common.btn,
    backgroundColor: "lightgreen"
  },
  textInput: {
    height: 40
  }
})

export default connect(null)(AddDeck)
