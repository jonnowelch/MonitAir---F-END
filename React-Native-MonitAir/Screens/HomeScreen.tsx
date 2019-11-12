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
              <Text style={styles.text}>{this.state.temp}</Text>
            </View>
            <Text style={styles.text}>Temperature</Text>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.circle}>
              <Text style={styles.text}>{this.state.pressure}</Text>
            </View>
            <Text style={styles.text}>Pressure</Text>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.circle}>
              <Text style={styles.text}>{this.state.humidity}</Text>
            </View>
            <Text style={styles.text}>Humidity</Text>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.circle}>
              <Text style={styles.text}>{this.state.tvoc}</Text>
            </View>
            <Text style={styles.text}>Air Quality</Text>
          </View>
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
    marginTop: 25,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 22
  }
});
