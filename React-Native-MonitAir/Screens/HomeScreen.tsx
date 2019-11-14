import { StyleSheet, Text, View, FlatList } from "react-native";
import Header from "../Components/Header";
import React from "react";
import Circle from "../Components/Circle";
import Loading from "../Components/Loading";
import axios from "axios";

export interface HomeProps {
  navigation: any;
}

interface State {
  temp: number;
  pressure: number;
  humidity: number;
  tvoc: number;
  isLoading: boolean;
  readings: any;
  errMsg: string;
}

export default class HomeScreen extends React.Component<HomeProps, State> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      temp: 20,
      pressure: 300,
      humidity: 22,
      tvoc: 12,
      isLoading: true,
      readings: [],
      errMsg: ""
    };
  }
  componentDidMount() {
    axios
      .get("http://brejconies.pythonanywhere.com/reading/00000000b7b25684")
      .then(r => {
        this.setState({ readings: r.data, isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const randomReading = Math.floor(Math.random() * 30 + 1);
    const reading = this.state.readings[randomReading];
    console.log(reading);
    if (this.state.isLoading) return <Loading />;
    const { navigation } = this.props;
    const user = JSON.stringify(navigation.getParam("username")).split('"')[1];
    return (
      <>
        <Header navigate={this.props.navigation.navigate} />
        <Text>Hi {user} welcome to your mointAir!</Text>
        <View style={styles.container}>
          <Circle
            title="Temperature"
            navigate={this.props.navigation.navigate}
            reading={reading.temp_mean}
          />
          <Circle
            title="Pressure"
            navigate={this.props.navigation.navigate}
            reading={reading.pressure_mean}
          />
          <Circle
            title="Humidity"
            navigate={this.props.navigation.navigate}
            reading={this.state.humidity}
          />
          <Circle
            title="Air Quality"
            navigate={this.props.navigation.navigate}
            reading={reading.tvoc_mean}
          />
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
