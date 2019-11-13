import React, { Component } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Header from "../Components/Header";
import DatePicker from "react-native-datepicker";
import firebase from "../firebase.js";

export interface RegisterProps {
  navigation: any;
}

interface State {
  forename: string;
  surname: string;
  email: string;
  password: string;
  user: string;
  DOB: Date;
}

export default class RegisterScreen extends Component<RegisterProps, State> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      forename: "",
      surname: "",
      email: "",
      password: "",
      user: "",
      DOB: null
    };
  }
  render() {
    const handleSubmit = () => {
      const { email, password } = this.state;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.props.navigation.navigate("Home", {
            forename: this.state.forename,
            surname: this.state.surname,
            email: this.state.email,
            user: this.state.user
          });
        })
        .catch((error: any) => {
          const errCode = error.code;
          const errMsg = error.message;
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
            value={this.state.forename}
            onChangeText={forename => this.setState({ forename })}
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
            value={this.state.user}
            onChangeText={user => this.setState({ user })}
          ></TextInput>
          <TextInput
            style={{ height: 40, borderColor: "black", borderWidth: 1 }}
            placeholder="Create Password"
            value={this.state.password}
            secureTextEntry={true}
            onChangeText={password => this.setState({ password })}
          ></TextInput>
          <DatePicker
            style={{ width: 200 }}
            mode="date"
            placeholder="Select DOB"
            format="DD-MM-YYYY"
            minDate="11-12-1920"
            maxDate="12-11-2019"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            value={this.state.DOB}
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={date => this.setState({ DOB: date })}
          ></DatePicker>
          <Button title="Submit" color="green" onPress={handleSubmit} />
        </View>
      </>
    );
  }
}
