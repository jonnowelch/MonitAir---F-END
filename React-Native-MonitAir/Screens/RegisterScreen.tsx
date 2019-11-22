import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import Header from '../Components/Header';
import firebase from '../firebase.js';
import axios from 'axios';
import Loading from '../Components/Loading';
import { LinearGradient } from 'expo-linear-gradient';

export interface RegisterProps {
  navigation: any;
}

interface State {
  first_name: string;
  surname: string;
  email: string;
  password: string;
  username: string;
  errCode: string;
  sensor_id: string;
  isLoading: boolean;
}

export default class RegisterScreen extends Component<RegisterProps, State> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      first_name: '',
      surname: '',
      email: '',
      password: '',
      username: '',
      sensor_id: '',
      errCode: undefined,
      isLoading: true
    };
  }
  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000);
  }
  render() {
    const { errCode, isLoading } = this.state;
    if (isLoading) return <Loading />;
    if (errCode) {
      const userFacingErrMsg =
        errCode === 'auth/invalid-email'
          ? 'Oops! Looks like your email address is invalid; please try again!'
          : errCode === 'auth/email-already-in-use'
          ? "Looks like you've already signed up! Please use login screen to log in!"
          : errCode === 'auth/weak-password'
          ? 'Your password is up to you, but it needs to be stronger than that!'
          : 'Fallback error message';
      Alert.alert('Registration Failed', userFacingErrMsg, [
        {
          text: 'Please try again',
          onPress: () => this.setState({ errCode: undefined })
        }
      ]);
    }

    const handleSubmit = () => {
      const {
        email,
        password,
        first_name,
        surname,
        username,
        sensor_id
      } = this.state;
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i;

      if (!regex.test(email)) {
        alert('Invalid email format');
        return;
      }
      if (!first_name.trim().length) {
        alert('Please enter a first name');
        return;
      }
      if (!surname.trim().length) {
        alert('Please enter a surname');
        return;
      }
      if (username.trim().length < 4) {
        alert('Username must be 4 or more characters');
        return;
      }
      if (!password.length) {
        alert('Ooops! You forgot to enter a password!');
        return;
      }
      if (sensor_id.length !== 16) {
        alert('Sensor ID will be 16 characters');
        return;
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          const userID = firebase.auth().currentUser!.uid;
          axios.post('http://brejconies.pythonanywhere.com/user', {
            first_name,
            surname,
            email,
            username,
            sensor_id,
            user_id: userID
          });
        })
        .then(() => {
          this.props.navigation.navigate('Login');
          Alert.alert('Successfully Registered! Please login.');
        })
        .catch(({ code }) => {
          this.setState({ errCode: code });
        });
    };
    return (
      <>
        <Header navigate={this.props.navigation.navigate} unclickable={true} />
        <View>
          <Text style={styles.enterDetails}>Please enter your details:</Text>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.input}
              placeholder="Enter Forename"
              value={this.state.first_name}
              onChangeText={first_name => this.setState({ first_name })}
            ></TextInput>
          </View>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.input}
              placeholder="Enter Surname"
              value={this.state.surname}
              onChangeText={surname => this.setState({ surname })}
            ></TextInput>
          </View>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              keyboardType="email-address"
            ></TextInput>
          </View>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.input}
              placeholder="Create Username"
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
            ></TextInput>
          </View>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.input}
              placeholder="Create Password"
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            ></TextInput>
          </View>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.input}
              placeholder="Enter Sensor ID"
              value={this.state.sensor_id}
              onChangeText={sensor_id => this.setState({ sensor_id })}
            ></TextInput>
          </View>
          <View style={styles.touchOpView}>
            <LinearGradient
              colors={['#3B7BFF', '#13D0FF']}
              style={styles.linearGradient}
            >
              <TouchableOpacity onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.alreadyView}>
            <Text style={styles.already}>
              Already have an account? Click below to return to the login screen
            </Text>
          </View>
          <View style={styles.touchOpView}>
            <LinearGradient
              colors={['#3B7BFF', '#13D0FF']}
              style={styles.linearGradient}
            >
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}
              >
                <Text style={styles.buttonText}>Return to Login</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  enterDetails: {
    fontSize: 20,
    paddingBottom: 20,
    color: '#13D0FF',
    alignSelf: 'center'
  },
  textInputView: { paddingBottom: 10 },
  input: {
    height: 40,
    width: 300,
    alignSelf: 'center',
    borderColor: '#3B7BFF',
    borderWidth: 1,
    paddingLeft: 15
  },
  linearGradient: {
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alreadyView: { justifyContent: 'center' },
  already: {
    marginTop: 20,
    paddingTop: 20,
    marginLeft: 20,
    marginRight: 20,
    color: '#13D0FF',
    alignSelf: 'center',
    fontFamily: 'Quicksand-SemiBold'
  },
  buttonText: { color: 'white', alignSelf: 'center' },
  touchOpView: { width: 200, marginTop: 20, alignSelf: 'center' }
});
