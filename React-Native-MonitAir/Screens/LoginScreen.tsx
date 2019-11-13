import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Header from "../Components/Header";
import firebase from "../firebase.js";

export interface LoginProps {
  navigation: any;
  email: string;
  uid: any;
  displayName: string;
  photoURL: string;
}

interface State {
  email: string;
  password: string;
  errMsg: string;
}

export default class LoginScreen extends Component<LoginProps, State> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errMsg: undefined
    };
  }
  render() {
    const handleLogin = () => {
      const { email, password } = this.state;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.navigate("Home", {
            email
          });
        })
        .catch(error => {
          const errCode = error.code;
          const errMsg = error.message;
          this.setState({ errMsg });
        });
    };
    return (
      <>
        <Header navigate={this.props.navigation.navigate} />
        <View>
          <Text style={{ marginTop: 30 }}>Welcome To MonitAir!</Text>
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
          {/* {this.state.errMsg ? <Text>Invalid password!!</Text> : null} */}
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
