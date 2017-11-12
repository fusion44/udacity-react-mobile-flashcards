import React from "react"
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TouchableOpacity
} from "react-native"

class DeckDetail extends React.PureComponent {
  onPressAddCard = () => {
    console.log("add card")
  }

  onPressStartQuiz = () => {
    const { deck } = this.props.navigation.state.params
    this.props.navigation.navigate("Quiz", { deck })
  }

  render() {
    const { deck } = this.props.navigation.state.params
    let subtitle = "No cards"
    if (deck.questions.length === 1) subtitle = "One card"
    else if (deck.questions.length > 1)
      subtitle = deck.questions.length + " cards"

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
          <TouchableOpacity
            style={styles.startQuizBtn}
            onPress={this.onPressStartQuiz}
          >
            <Text>START QUIZ</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
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
    width: "100%",
    height: 40,
    backgroundColor: "lightgreen",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    margin: 5
  },
  startQuizBtn: {
    width: "100%",
    height: 40,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    margin: 5
  }
})

export default DeckDetail
