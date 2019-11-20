import React, { Component } from "react";
import { Text, View, TextInput, Alert, Image, StyleSheet } from "react-native";
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
  errCode: string;
  isLoading: boolean;
}

export default class LoginScreen extends Component<LoginProps, State> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      errCode: undefined,
      isLoading: true
    };
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  render() {
    const { errCode } = this.state;
    if (errCode) {
      const userFacingErrMsg: string =
        errCode === "auth/user-not-found"
          ? "Looks like your email address isn't yet registered with us - sign in from the front screen!"
          : errCode === "auth/invalid-email"
          ? "Hmm... ...that's not an email address!"
          : errCode === "auth/wrong-password"
          ? "Uh-oh. Wrong password - try again!"
          : "There was a problem, but it might be us - please check your details and try again";
      Alert.alert("Login failed", userFacingErrMsg, [
        {
          text: "Try again",
          onPress: () => this.setState({ errCode: undefined })
        }
      ]);
    }
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
          console.log(error.code, "<==error.code");
          const errCode = String(error.code);
          this.setState({ errCode });
        });
    };
    return (
      <>
        <View style={{ paddingTop: 20 }}>
          <Header navigate={this.props.navigation.navigate} />
        </View>
        <View style={{ alignSelf: "center", flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              paddingTop: 20,
              color: "#13D0FF",
              marginLeft: 10
            }}
          >
            Please login:
            <Image
              source={{
                uri:
                  "http://3.bp.blogspot.com/-VjBLo3zVT6E/Uh8WiPorbeI/AAAAAAAABm0/v5Q2cpGVsCA/s1600/cloudtest001.gif"
              }}
              style={{
                height: 80,
                width: 80,
                alignSelf: "flex-end",
                paddingLeft: 20
              }}
            ></Image>
          </Text>
          <View style={{ paddingBottom: 20, marginTop: 40 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </View>
          <View style={{ paddingBottom: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <View style={styles.buttonView}>
            <LinearGradient
              colors={["#3B7BFF", "#13D0FF"]}
              style={{
                padding: 15,
                borderRadius: 10
              }}
            >
              <TouchableOpacity onPress={handleLogin}>
                <Text style={{ color: "white", alignSelf: "center" }}>
                  Login
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                marginTop: 20,
                paddingTop: 20,
                marginLeft: 20,
                marginRight: 20,
                color: "#13D0FF",
                alignSelf: "center"
              }}
            >
              Don't have an account? Hit the button below to get started!
            </Text>
          </View>
          <View style={styles.buttonView}>
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

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 300,
    borderColor: "#3B7BFF",
    borderWidth: 1,
    alignSelf: "center",
    paddingLeft: 15
  },
  buttonView: {
    width: 200,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20
  }
});
