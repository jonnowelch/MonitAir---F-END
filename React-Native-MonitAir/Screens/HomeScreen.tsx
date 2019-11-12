import { StyleSheet, Text, View } from "react-native";
import Header from "../Components/Header";
import React from "react";

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
          <View style={styles.gridItem}>
            <View style={styles.circle}>
              <Text>{this.state.temp}</Text>
            </View>
            <Text>Temperature</Text>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.circle}>
              <Text>{this.state.pressure}</Text>
            </View>
            <Text>Pressure</Text>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.circle}>
              <Text>{this.state.humidity}</Text>
            </View>
            <Text>Humidity</Text>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.circle}>
              <Text>{this.state.tvoc}</Text>
            </View>
            <Text>Air Quality</Text>
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  gridItem: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "black",
    borderWidth: 2,
    margin: 25,
    justifyContent: "center",
    alignItems: "center"
  }
});
