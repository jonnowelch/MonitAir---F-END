import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import Header from "../Components/Header";
import firebase from "../firebase.js";

export interface RegisterProps {
  navigation: any;
  email: string;
  uid: any;
  displayName: string;
  photoURL: string;
}

interface State {
  first_name: string;
  surname: string;
  email: string;
  password: string;
  username: string;
  DOB: Date;
  errMsg: string;
  sensor_id: string;
}

export default class RegisterScreen extends Component<RegisterProps, State> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      first_name: "",
      surname: "",
      email: "",
      password: "",
      username: "",
      DOB: null,
      sensor_id: "",
      errMsg: undefined
    };
  }
  render() {
    const { errMsg } = this.state;
    if (errMsg)
      Alert.alert("Registration Failed", errMsg, [
        {
          text: "Please try again",
          onPress: () => this.setState({ errMsg: undefined })
        }
      ]);
    const handleSubmit = () => {
      const { email, password } = this.state;

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.navigate("Home", {
            first_name: this.state.first_name,
            surname: this.state.surname,
            email: this.state.email,
            username: this.state.username
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
          <Text style={{ fontSize: 20, paddingBottom: 20 }}>
            Look how far we've come....
          </Text>
          <TextInput
            style={{ height: 40, borderColor: "black", borderWidth: 1 }}
            placeholder="Enter Forename"
            value={this.state.first_name}
            onChangeText={first_name => this.setState({ first_name })}
          ></TextInput>
          <TextInput
            style={{ height: 40, borderColor: "black", borderWidth: 1 }}
            placeholder="Enter Surname"
            value={this.state.surname}
            onChangeText={surname => this.setState({ surname })}
          ></TextInput>
          <TextInput
            style={{ height: 40, borderColor: "black", borderWidth: 1 }}
            placeholder="Enter Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          ></TextInput>
          <TextInput
            style={{ height: 40, borderColor: "black", borderWidth: 1 }}
            placeholder="Create Usernmae"
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          ></TextInput>
          <TextInput
            style={{ height: 40, borderColor: "black", borderWidth: 1 }}
            placeholder="Create Password"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          ></TextInput>
          <TextInput
            style={{ height: 40, borderColor: "black", borderWidth: 1 }}
            placeholder="Enter Sensor ID"
            value={this.state.sensor_id}
            onChangeText={sensor_id => this.setState({ sensor_id })}
          ></TextInput>
          <Button title="Submit" color="green" onPress={handleSubmit} />
        </View>
      </>
    );
  }
}
