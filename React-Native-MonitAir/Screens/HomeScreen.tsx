import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Header from '../Components/Header';
import React from 'react';
import Circle from '../Components/Circle';
import Loading from '../Components/Loading';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import MainCircle from '../Components/MainCircle';
import { TouchableHighlight } from 'react-native-gesture-handler';
import * as api from '../api';

export interface HomeProps {
  navigation: any;
}

interface Reading {
  humidity_mean: number;
  pressure_mean: number;
  reading_id: number;
  sensor_id: string;
  temp_mean: number;
  timestamp: string;
  total_quality_mean: number;
}

interface State {
  isLoading: boolean;
  reading: Reading;
  errMsg: string;
  loggedInUser: any;
}

export default class HomeScreen extends React.Component<HomeProps, State> {
  constructor(props: HomeProps) {
    super(props);
    this.updateReadings = this.updateReadings.bind(this);
    this.state = {
      loggedInUser: [],
      isLoading: true,
      reading: {
        humidity_mean: null,
        pressure_mean: null,
        reading_id: null,
        sensor_id: '',
        temp_mean: null,
        timestamp: '',
        total_quality_mean: null
      },
      errMsg: null
    };
  }
  componentDidMount() {
    axios
      .get('http://brejconies.pythonanywhere.com/user')
      .then(r => {
        const { navigation } = this.props;
        const email = JSON.stringify(navigation.getParam('email')).split(
          '"'
        )[1];
        const checkUsers = r.data.filter(user => {
          if (user.email === email) {
            return user;
          }
        });
        this.setState({
          loggedInUser: checkUsers,
          isLoading: false
        });
      })
      .then(() => {
        const { loggedInUser } = this.state;
        axios
          .get(
            `http://brejconies.pythonanywhere.com/most_recent_reading/${loggedInUser[0].sensor_id}`
          )
          .then(r => {
            this.updateReadings();

            this.setState({ reading: r.data, isLoading: false });
          });
      })
      .catch(err => {
        console.log('catch block');

        this.setState({ errMsg: err.response.data.msg });
      });
  }

  updateReadings() {
    const { loggedInUser } = this.state;
    setInterval(() => {
      return axios
        .get(
          `http://brejconies.pythonanywhere.com/most_recent_reading/${loggedInUser[0].sensor_id}`
        )
        .then(r => {
          this.setState({ reading: r.data });
        })
        .catch(err => {
          console.log('catch block');

          this.setState({ errMsg: err.response.data.msg });
        });
    }, 30000);
  }
  render() {
    const { reading, loggedInUser, errMsg } = this.state;
    const sensor_id = loggedInUser[0] && loggedInUser[0].sensor_id;
    const { navigate } = this.props.navigation;
    if (errMsg) {
      Alert.alert('Login failed', errMsg, [
        {
          text: 'Try again',
          onPress: () => this.setState({ errMsg: '' })
        }
      ]);
    }
    if (this.state.isLoading) return <Loading />;
    return (
      <>
        <Header navigate={this.props.navigation} unclickable={true} />
        <TouchableHighlight
          onPress={() => {
            navigate('EasterEgg');
          }}
        >
          <Text
            style={{
              color: '#3B7BFF',
              alignSelf: 'center',
              fontFamily: 'Quicksand-SemiBold'
            }}
          >
            Hi {loggedInUser[0] && loggedInUser[0].username} welcome to your
            monitAir!
          </Text>
        </TouchableHighlight>
        <View style={styles.container}>
          <MainCircle
            title="Air Quality Index"
            navigate={navigate}
            reading={reading.total_quality_mean}
            sensor_id={sensor_id}
            query="total_quality_mean"
          />
          <Circle
            title="Temperature - °C"
            navigate={navigate}
            reading={reading.temp_mean}
            sensor_id={sensor_id}
            query="temp_mean"
          />
          <Circle
            title="Humidity - %"
            navigate={navigate}
            reading={reading.humidity_mean}
            sensor_id={sensor_id}
            query="humidity_mean"
          />
          <Text style={styles.text}>
            Click the button below for hints and tips on how to keep the air
            quality clean in your home!
          </Text>
          <LinearGradient
            colors={['#3B7BFF', '#13D0FF']}
            style={{ padding: 15, borderRadius: 10 }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Hints')}
            >
              <Text style={styles.buttonText}>Hints & Tips</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#3B7BFF',
    margin: 10,
    alignSelf: 'center',
    fontFamily: 'Quicksand-SemiBold'
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Quicksand-SemiBold'
  }
});
