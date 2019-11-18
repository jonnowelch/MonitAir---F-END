import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import Header from "../Components/Header";
import firebase from "../firebase.js";
import Loading from "../Components/Loading";

export interface LoginProps {
  navigation: any;
}

interface State {
  email: string;
  username: string;
  password: string;
  errMsg: string;
  isLoading: boolean;
}

export default class LoginScreen extends Component<LoginProps, State> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      errMsg: undefined,
      isLoading: true
    };
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  render() {
    const { errMsg } = this.state;
    if (errMsg)
      Alert.alert("Login failed", errMsg, [
        {
          text: "Try again",
          onPress: () => this.setState({ errMsg: undefined })
        }
      ]);
    const handleLogin = () => {
      const { isLoading } = this.state;
      if (isLoading) return <Loading />;
      const { email, password, username } = this.state;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.navigate("Home", {
            email: this.state.email
          });
        })
        .catch(error => {
          const errMsg = error.message;
          this.setState({ errMsg });
        });
    };
    return (
      <>
        <Header navigate={this.props.navigation.navigate} />
        <View>
          <View style={{ padding: 10, marginTop: 40 }}>
            <TextInput
              style={{ height: 40, borderColor: "black", borderWidth: 1 }}
              placeholder="Enter Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
            <TextInput
              style={{ height: 40, borderColor: "black", borderWidth: 1 }}
              placeholder="Enter Password"
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <View>
            <Button onPress={handleLogin} title="Login" color="green" />
          </View>
          <View>
            <Text style={{ marginTop: 20 }}>
              Don't have an account? Hit the button below to get started!
            </Text>
            <Button
              title="Register"
              color="red"
              onPress={() => {
                this.props.navigation.navigate("Register");
              }}
            />
          </View>
        </View>
      </>
    );
  }
}
