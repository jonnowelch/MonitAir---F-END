import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./Screens/HomeScreen";

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen, navigationOptions: { header: null } }
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
