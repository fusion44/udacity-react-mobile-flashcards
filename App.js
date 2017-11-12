import React from "react"
import { StyleSheet, Text, View, StatusBar, FlatList } from "react-native"
import Home from "./components/Home"
import DeckDetail from "./components/DeckDetail"
import Quiz from "./components/Quiz"
import { Constants } from "expo"

import { StackNavigator } from "react-navigation"

const ViewStack = StackNavigator({
  Home: {
    screen: Home
  },
  DeckDetail: {
    screen: DeckDetail
  },
  Quiz: {
    screen: Quiz
  }
})

const AppStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar backgroundColor="blue" barStyle="light-content" />
        <ViewStack />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
