import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface CircleProps {
  title: string;
  reading: number;
  navigate: any;
  sensor_id: any;
  query: string;
}

interface State {
  isLoading: boolean;
}
// title,
// reading,
// navigate,
// sensor_id,
// query

export default class Circle extends React.Component<CircleProps, State> {
  constructor(props: CircleProps) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  componentDidUpdate(prevProps, prevState) {
    const reading = this.props.reading;
    const title = this.props.title;
    if (this.props.reading !== prevProps.reading) {
      setBackgroundColour(reading, title);
    }
  }
  render() {
    const navigate = this.props.navigate;
    const title = this.props.title;
    const sensor_id = this.props.sensor_id;
    const query = this.props.query;
    const reading = this.props.reading;
    return (
      <>
        <View style={styles.gridItem}>
          <View
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              borderColor: "#13D0FF",
              borderWidth: 2,
              marginTop: 25,
              marginBottom: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: setBackgroundColour(reading, title)
            }}
          >
            <Text
              style={styles.text}
              onPress={() => {
                navigate("Analysis", {
                  title,
                  sensor_id,
                  query
                });
              }}
            >
              {reading}
            </Text>
          </View>
          <Text style={{ color: "#3B7BFF" }}>{title}</Text>
        </View>
      </>
    );
  }
}
const setBackgroundColour = (reading, title) => {
  if (reading < 0 && title === "Temperature - °C") {
    return "#80ffff";
  }
  if (reading > 0 && reading <= 10 && title === "Temperature - °C") {
    return "#00b3b3";
  }
  if (reading > 10 && reading <= 15 && title === "Temperature - °C") {
    return "#ffa31a";
  }
  if (reading > 15 && reading <= 20 && title === "Temperature - °C") {
    return "#ff8c1a";
  }
  if (reading > 20 && reading <= 30 && title === "Temperature - °C") {
    return "#ff6600";
  }
  if (reading > 40 && title === "Temperature - °C") {
    return "#ff3300";
  }
  if (title === "Humidity - %" && reading < 33) {
    return "#df80ff";
  }
  if (title === "Humidity - %" && reading > 33 && reading <= 66) {
    return "#df80ff";
  }
  if (title === "Humidity - %" && reading > 66 && reading <= 100) {
    return "#730099";
  }
};

const styles = StyleSheet.create({
  // circle: {
  //   width: 90,
  //   height: 90,
  //   borderRadius: 45,
  //   borderColor: "#13D0FF",
  //   borderWidth: 2,
  //   marginTop: 25,
  //   marginBottom: 5,
  //   justifyContent: "center",
  //   alignItems: "center"
  // },
  text: {
    fontSize: 22,
    color: "#3B7BFF"
  },
  gridItem: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  }
});
