import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Header from "../Components/Header";
import React from "react";
import Circle from "../Components/Circle";
import Loading from "../Components/Loading";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import MainCircle from "../Components/MainCircle";
import { TouchableHighlight } from "react-native-gesture-handler";

export interface HomeProps {
  navigation: any;
}

interface State {
  isLoading: boolean;
  reading: any;
  errMsg: any;
  loggedInUser: any;
}

export default class HomeScreen extends React.Component<HomeProps, State> {
  constructor(props: HomeProps) {
    super(props);
    this.updateReadings = this.updateReadings.bind(this);
    this.state = {
      loggedInUser: [],
      isLoading: true,
      reading: {},
      errMsg: null
    };
  }
  componentDidMount() {
    axios
      .get("http://brejconies.pythonanywhere.com/user")
      .then(r => {
        const { navigation } = this.props;
        const email = JSON.stringify(navigation.getParam("email")).split(
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
            this.setState({ reading: r.data, isLoading: false });
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.reading.total_quality_mean !==
      prevState.reading.total_quality_mean
    ) {
      this.updateReadings();
    }
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
          console.log(err);
        });
    }, 10000);
  }
  render() {
    const { reading } = this.state;
    const { loggedInUser } = this.state;
    const sensor_id = loggedInUser[0] && loggedInUser[0].sensor_id;
    if (this.state.isLoading) return <Loading />;
    return (
      <>
        <Header navigate={this.props.navigation} />
        <TouchableHighlight
          onPress={() => {
            this.props.navigation.navigate("EasterEgg");
          }}
        >
          <Text style={{ color: "#13D0FF" }}>
            Hi {loggedInUser[0] && loggedInUser[0].username} welcome to your
            monitAir!
            <Image
              style={{ height: 50, width: 50, alignSelf: "flex-end" }}
              source={{
                uri:
                  "http://3.bp.blogspot.com/-VjBLo3zVT6E/Uh8WiPorbeI/AAAAAAAABm0/v5Q2cpGVsCA/s1600/cloudtest001.gif"
              }}
            ></Image>
          </Text>
        </TouchableHighlight>

        <View style={styles.container}>
          <MainCircle
            title="Air Quality Index Score"
            navigate={this.props.navigation.navigate}
            reading={reading.total_quality_mean}
            sensor_id={sensor_id}
            query="total_quality_mean"
          />
          <Circle
            title="Temperature - °C"
            navigate={this.props.navigation.navigate}
            reading={reading.temp_mean}
            sensor_id={sensor_id}
            query="temp_mean"
          />
          <Circle
            title="Humidity - %"
            navigate={this.props.navigation.navigate}
            reading={reading.humidity_mean}
            sensor_id={sensor_id}
            query="humidity_mean"
          />
          <Text style={{ color: "#13D0FF", marginTop: 20, marginBottom: 10 }}>
            Click the button below for hints and tips on how to keep the air
            quality clean in your home!
          </Text>
          <LinearGradient
            colors={["#3B7BFF", "#13D0FF"]}
            style={{ padding: 15, borderRadius: 10 }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Hints")}
            >
              <Text
                style={{
                  color: "white",
                  alignSelf: "center"
                }}
              >
                Hints & Tips
              </Text>
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
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
