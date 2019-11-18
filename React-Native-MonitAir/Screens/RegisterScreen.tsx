import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import Header from "../Components/Header";
import firebase from "../firebase.js";
import axios from "axios";
import Loading from "../Components/Loading";

export interface RegisterProps {
  navigation: any;
}

interface State {
  first_name: string;
  surname: string;
  email: string;
  password: string;
  username: string;
  errMsg: string;
  sensor_id: string;
  isLoading: boolean;
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
      sensor_id: "",
      errMsg: undefined,
      isLoading: true
    };
  }
  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000);
  }
  render() {
    if (this.state.isLoading) return <Loading />;
    const { errMsg } = this.state;
    if (errMsg)
      Alert.alert("Registration Failed", errMsg, [
        {
          text: "Please try again",
          onPress: () => this.setState({ errMsg: undefined })
        }
      ]);
    const handleSubmit = () => {
      const {
        email,
        password,
        first_name,
        surname,
        username,
        sensor_id
      } = this.state;

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const userID = firebase.auth().currentUser!.uid;
          axios.post("http://brejconies.pythonanywhere.com/user", {
            first_name,
            surname,
            email,
            username,
            sensor_id,
            user_id: userID
          });
        })
        .then(() => {
          this.props.navigation.navigate("Home", {
            first_name: this.state.first_name,
            surname: this.state.surname,
            email: this.state.email,
            username: this.state.username
          });
        })
        .catch((error: any) => {
          const errMsg = error.message;
          this.setState({ errMsg });
        });
    };
    return (
      <>
        <Header navigate={this.props.navigation.navigate} />
        <View>
          <Text style={{ fontSize: 20, paddingBottom: 20, color: "#13D0FF" }}>
            Look how far we've come....
          </Text>
          <View style={{ paddingBottom: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter Forename"
              value={this.state.first_name}
              onChangeText={first_name => this.setState({ first_name })}
            ></TextInput>
          </View>
          <View style={{ paddingBottom: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter Surname"
              value={this.state.surname}
              onChangeText={surname => this.setState({ surname })}
            ></TextInput>
          </View>
          <View style={{ paddingBottom: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            ></TextInput>
          </View>
          <View style={{ paddingBottom: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Create Usernmae"
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
            ></TextInput>
          </View>
          <View style={{ paddingBottom: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Create Password"
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            ></TextInput>
          </View>
          <View style={{ paddingBottom: 10 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter Sensor ID"
              value={this.state.sensor_id}
              onChangeText={sensor_id => this.setState({ sensor_id })}
            ></TextInput>
          </View>
          <View style={{ width: 200, marginTop: 20, alignSelf: "center" }}>
            <Button title="Submit" color="green" onPress={handleSubmit} />
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
    alignSelf: "center",
    borderColor: "#3B7BFF",
    borderWidth: 1
  }
});
