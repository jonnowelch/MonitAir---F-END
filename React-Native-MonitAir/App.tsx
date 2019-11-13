import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./Screens/HomeScreen";
import AnalysisScreen from "./Screens/AnalysisScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import firebase from "./firebase.js";

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
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
        () => {
          this.handleLoginSuccess(email, uid, displayName, photoURL);
        };
      } else {
        // User is signed out.
        // ...
      }
    });
    return <AppContainer />;
  }
  handleLoginSuccess = (
    email: string,
    uid: any,
    displayName: string,
    photoURL: string
  ) => {
    this.setState({ email, uid, displayName, photoURL });
  };
}
