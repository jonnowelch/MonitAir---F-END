import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './Screens/HomeScreen';
import AnalysisScreen from './Screens/AnalysisScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import Loading from './Components/Loading';
import HintsScreen from './Screens/HintsScreen';
import EasterEgg from './Screens/EasterEgg';
import * as Font from 'expo-font';

const MainNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen, navigationOptions: { header: null } },
    Analysis: { screen: AnalysisScreen, navigationOptions: { header: null } },
    Login: { screen: LoginScreen, navigationOptions: { header: null } },
    Register: { screen: RegisterScreen, navigationOptions: { header: null } },
    Hints: { screen: HintsScreen, navigationOptions: { header: null } },
    EasterEgg: { screen: EasterEgg, navigationOptions: { header: null } }
  },
  { initialRouteName: 'Login' }
);

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  state = {
    isLoading: true
  };
  async componentDidMount() {
    await Font.loadAsync({
      'Quicksand-SemiBold': require('./assets/fonts/Quicksand-SemiBold.ttf')
    });
    this.setState({ isLoading: false });
  }
  render() {
    return this.state.isLoading ? <Loading /> : <AppContainer />;
  }
}
