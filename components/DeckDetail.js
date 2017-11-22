import React from "react"
import { connect } from "react-redux"
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity
} from "react-native"
import { getDeck } from "../_helpers"
import { fetchDeck } from "../actions"
import common from "../common/styles"

class DeckDetail extends React.PureComponent {
  componentWillMount() {
    this.props.dispatch(fetchDeck(this.props.title))
  }

  onPressAddCard = () => {
    this.props.navigation.navigate("AddCard", {
      title: this.props.title
    })
  }

  onPressStartQuiz = () => {
    this.props.navigation.navigate("Quiz", { deck: this.props.deck })
  }

  render() {
    const { deck, loading } = this.props
    let subtitle = "No cards"
    quizDisabled = true
    if (!loading && deck.questions.length === 1) {
      quizDisabled = false
      subtitle = "One card"
    } else if (!loading && deck.questions.length > 1) {
      quizDisabled = false
      subtitle = deck.questions.length + " cards"
    }

    if (loading) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Loading ...</Text>
          </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addCardBtn}
              onPress={this.onPressAddCard}
            >
              <Text>ADD CARD</Text>
            </TouchableOpacity>
            {quizDisabled ? (
              <Text>Add Cards to start quiz</Text>
            ) : (
              <TouchableOpacity
                style={styles.startQuizBtn}
                onPress={this.onPressStartQuiz}
              >
                <Text>START QUIZ</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  header: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20
  },
  title: {
    fontSize: 60
  },
  subtitle: {
    fontSize: 35
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    width: 200
  },
  addCardBtn: {
    ...common.btn,
    backgroundColor: "lightgreen"
  },
  startQuizBtn: {
    ...common.btn,
    backgroundColor: "lightblue"
  }
})

function mapStateToProps({ decks }, ownProps) {
  const { title } = ownProps.navigation.state.params
  if (Object.keys(decks.decks).length === 0) {
    return {
      title,
      deck: {},
      loading: true
    }
  } else {
    return {
      title,
      deck: decks.decks[title],
      loading: false
    }
  }
}

export default connect(mapStateToProps)(DeckDetail)
