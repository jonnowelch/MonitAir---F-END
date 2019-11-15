import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./Screens/HomeScreen";
import AnalysisScreen from "./Screens/AnalysisScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import Loading from "./Components/Loading";
import HintsScreen from "./Screens/HintsScreen";

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen, navigationOptions: { header: null } },
    Analysis: { screen: AnalysisScreen, navigationOptions: { header: null } },
    Login: { screen: LoginScreen, navigationOptions: { header: null } },
    Register: { screen: RegisterScreen, navigationOptions: { header: null } },
    Hints: { screen: HintsScreen, navigationOptions: { header: null } }
  },
  { initialRouteName: "Login" }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 3000);
  }
  render() {
    if (this.state.isLoading) return <Loading />;
    return <AppContainer />;
  }
}
