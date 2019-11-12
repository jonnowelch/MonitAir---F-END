import { StyleSheet, Text, View } from "react-native";
import Header from "../Components/Header";
import React from "react";
import Circle from "../Components/Circle";

export interface HomeProps {
  navigation: any;
}

interface State {
  temp: number;
  pressure: number;
  humidity: number;
  tvoc: number;
}

export default class HomeScreen extends React.Component<HomeProps, State> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      temp: 20,
      pressure: 300,
      humidity: 22,
      tvoc: 12
    };
  }

  render() {
    return (
      <>
        <Header navigate={this.props.navigation.navigate} />
        <View style={styles.container}>
          <Circle
            title="Temperature"
            navigate={this.props.navigation.navigate}
            reading={this.state.temp}
          />
          <Circle
            title="Pressure"
            navigate={this.props.navigation.navigate}
            reading={this.state.pressure}
          />
          <Circle
            title="Humidity"
            navigate={this.props.navigation.navigate}
            reading={this.state.humidity}
          />
          <Circle
            title="Air Quality"
            navigate={this.props.navigation.navigate}
            reading={this.state.tvoc}
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
