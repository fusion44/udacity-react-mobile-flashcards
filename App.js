import React from "react"
import { StyleSheet, Text, View, StatusBar, FlatList } from "react-native"
import Home from "./components/Home"
import DeckDetail from "./components/DeckDetail"
import Quiz from "./components/Quiz"
import AddDeck from "./components/AddDeck"
import AddCard from "./components/AddCard"
import { Constants } from "expo"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import reducer from "./reducers"
import { Provider } from "react-redux"

import { StackNavigator } from "react-navigation"

const store = createStore(reducer, applyMiddleware(thunk))

const ViewStack = StackNavigator({
  Home: {
    screen: Home
  },
  DeckDetail: {
    screen: DeckDetail
  },
  Quiz: {
    screen: Quiz
  },
  AddDeck: {
    screen: AddDeck
  },
  AddCard: {
    screen: AddCard
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
      <Provider store={store}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor="blue" barStyle="light-content" />
          <ViewStack />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
