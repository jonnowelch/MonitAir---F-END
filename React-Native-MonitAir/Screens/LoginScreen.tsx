import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Header from "../Components/Header";

export interface LoginProps {
  navigation: any;
}

interface State {
  user: string;
  password: string;
}

export default class LoginScreen extends Component<LoginProps, State> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      user: "",
      password: ""
    };
  }
  render() {
    return (
      <>
        <Header navigate={this.props.navigation.navigate} />
        <View>
          <Text style={{ marginTop: 30 }}>Welcome To MonitAir!</Text>
          <View style={{ padding: 10, marginTop: 40 }}>
            <TextInput
              style={{ height: 40, borderColor: "black", borderWidth: 1 }}
              placeholder="Enter Username"
              value={this.state.user}
              onChangeText={user => this.setState({ user })}
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
            <Button
              onPress={() =>
                this.props.navigation.navigate("Home", {
                  user: this.state.user,
                  password: this.state.password
                })
              }
              title="Login"
              color="green"
            />
          </View>
          <View>
            <Text style={{ marginTop: 20 }}>
              Don't have an account? Hit the button below to get started!
            </Text>
            <Button
              title="Register"
              color="red"
              onPress={() => this.props.navigation.navigate("Register")}
            />
          </View>
        </View>
      </>
    );
  }
}
