import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./Screens/HomeScreen";
import AnalysisScreen from "./Screens/AnalysisScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen, navigationOptions: { header: null } },
    Analysis: { screen: AnalysisScreen, navigationOptions: { header: null } },
    Login: { screen: LoginScreen, navigationOptions: { header: null } },
    Register: { screen: RegisterScreen, navigationOptions: { header: null } }
  },
  { initialRouteName: "Login" }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  state = {
    email: "",
    uid: "",
    displayName: "",
    photoURL: ""
  };
  render() {
    return <AppContainer />;
  }
}
