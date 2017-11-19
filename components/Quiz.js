import React from "react"
import {
  Alert,
  Animated,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native"
import ProgressBar from "react-native-progress/Bar"
import { setLocalNotification } from "../_helpers"

class DeckDetail extends React.PureComponent {
  state = {
    currentQuestion: 0,
    progress: 0,
    correct: 0
  }

  componentWillMount() {
    this.cardRotY = new Animated.Value(0)
    this.currentRotation = 0
    this.cardRotY.addListener(({ value }) => {
      this.currentRotation = value
    })

    this.cardFrontInterpolate = this.cardRotY.interpolate({
      inputRange: [0, 180],
      outputRange: ["0deg", "180deg"]
    })
    // backface culling not implemented for Android. Workaround:
    // https://github.com/facebook/react-native/issues/1973#issuecomment-262059217
    this.frontOpacity = this.cardRotY.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })

    this.cardBackInterpolate = this.cardRotY.interpolate({
      inputRange: [0, 180],
      outputRange: ["180deg", "360deg"]
    })
    this.backOpacity = this.cardRotY.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  onPressShowAnswer = () => {
    let toValue = 180
    if (this.currentRotation >= 90) toValue = 0

    Animated.spring(this.cardRotY, {
      toValue,
      friction: 10,
      tension: 20
    }).start()
  }

  onPressCorrect = () => {
    const { deck } = this.props.navigation.state.params
    let nextQ = this.state.currentQuestion + 1
    let progress = nextQ / deck.questions.length
    this.setState({
      correct: this.state.correct + 1,
      currentQuestion: nextQ,
      progress
    })

    if (nextQ >= deck.questions.length) {
      let score = 100 / deck.questions.length * (this.state.correct + 1)
      this.showEndModal(score)
    }
  }

  onPressIncorrect = () => {
    const { deck } = this.props.navigation.state.params
    let nextQ = this.state.currentQuestion + 1
    let progress = nextQ / deck.questions.length
    this.setState({
      currentQuestion: nextQ,
      progress
    })

    if (nextQ >= deck.questions.length) {
      let score = 100 / deck.questions.length * this.state.correct
      this.showEndModal(score)
    }
  }

  showEndModal(score) {
    const { deck } = this.props.navigation.state.params

    setLocalNotification()

    Alert.alert(
      "You've got it!",
      `Your score: ${score}%`,
      [
        {
          text: "Repeat",
          onPress: () =>
            this.setState({ correct: 0, currentQuestion: 0, progress: 0 })
        },
        {
          text: "OK",
          onPress: () => this.props.navigation.goBack()
        }
      ],
      { cancelable: false }
    )
  }

  render() {
    const frontAnimatedStyle = {
      transform: [{ rotateY: this.cardFrontInterpolate }],
      opacity: this.frontOpacity
    }

    const backAnimatedStyle = {
      transform: [{ rotateY: this.cardBackInterpolate }],
      opacity: this.backOpacity
    }

    const { deck } = this.props.navigation.state.params
    let curr = deck.questions[this.state.currentQuestion]

    // We might have finished
    if (!curr) curr = deck.questions[this.state.currentQuestion - 1]
    return (
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <ProgressBar
            style={{ width: "100%" }}
            progress={this.state.progress}
            width={null}
            height={10}
            borderRadius={0}
          />
          <Text style={styles.progressText}>
            {`${this.state.currentQuestion}/${deck.questions.length}`}
          </Text>
        </View>
        <View style={styles.header}>
          <Animated.View style={frontAnimatedStyle}>
            <Text style={styles.title}>{curr.question}</Text>
          </Animated.View>
          <Animated.View style={[styles.flipBack, backAnimatedStyle]}>
            <Text style={styles.title}>{curr.answer}</Text>
          </Animated.View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.showAnswerBtn}
            onPress={this.onPressShowAnswer}
          >
            <Text>SHOW ANSWER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.correctBtn}
            onPress={this.onPressCorrect}
          >
            <Text>CORRECT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.incorrectBtn}
            onPress={this.onPressIncorrect}
          >
            <Text>INCORRECT</Text>
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
  flipFront: {
    backfaceVisibility: "hidden"
  },
  flipBack: {
    position: "absolute",
    top: 0
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    width: 200
  },
  showAnswerBtn: {
    width: "100%",
    height: 40,
    marginBottom: 40,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    margin: 5
  },
  correctBtn: {
    width: "100%",
    height: 40,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    margin: 10
  },
  incorrectBtn: {
    width: "100%",
    height: 40,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    margin: 10
  },
  progressText: {
    width: "100%",
    position: "absolute",
    top: 0,
    textAlign: "center",
    fontSize: 9,
    fontWeight: "bold"
  }
})

export default DeckDetail
