import { StyleSheet, Text, View } from "react-native";
import Header from "../Components/Header";
import React from "react";
import Circle from "../Components/Circle";

export interface Props {
  navigation: any;
}

interface State {
  temp: number;
  pressure: number;
  humidity: number;
  tvoc: number;
}

export default class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
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
          <Circle title="Temperature" reading={this.state.temp} />
          <Circle title="Pressure" reading={this.state.pressure} />
          <Circle title="Humidity" reading={this.state.humidity} />
          <Circle title="Air Quality" reading={this.state.tvoc} />
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
