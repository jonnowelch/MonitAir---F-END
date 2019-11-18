import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TextInput, Alert } from "react-native";
import Header from "../Components/Header";
import firebase from "../firebase.js";
import Loading from "../Components/Loading";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

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
        <View style={{ paddingTop: 20 }}>
          <Header navigate={this.props.navigation.navigate} />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Text style={{ fontSize: 20, paddingTop: 20, color: "#13D0FF" }}>
            Please login:
          </Text>
          <View style={{ paddingBottom: 10, marginTop: 40 }}>
            <TextInput
              style={{
                height: 40,
                width: 300,
                borderColor: "#3B7BFF",
                borderWidth: 1,
                alignSelf: "center",
                paddingBottom: 10
              }}
              placeholder="Enter Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </View>
          <View>
            <TextInput
              style={{
                height: 40,
                width: 300,
                alignSelf: "center",
                borderColor: "#3B7BFF",
                borderWidth: 1
              }}
              placeholder="Enter Password"
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <View
            style={{
              width: 200,
              alignSelf: "center",
              justifyContent: "center",
              marginTop: 20
            }}
          >
            <LinearGradient
              colors={["#3B7BFF", "#13D0FF"]}
              style={{
                padding: 15,
                borderRadius: 10,
                justifyContent: "center"
              }}
            >
              <TouchableOpacity style={{ width: 200 }} onPress={handleLogin}>
                <Text style={{ color: "white", alignSelf: "center" }}>
                  Login
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={{ width: "50%", alignSelf: "center" }}>
            <Text
              style={{
                marginTop: 20,
                paddingTop: 20,
                paddingBottom: 20,
                color: "#13D0FF"
              }}
            >
              Don't have an account? Hit the button below to get started!
            </Text>
            <LinearGradient
              colors={["#3B7BFF", "#13D0FF"]}
              style={{ padding: 15, borderRadius: 10 }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("Register");
                }}
              >
                <Text style={{ color: "white", alignSelf: "center" }}>
                  {" "}
                  Register{" "}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </>
    );
  }
}
