import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  title: string;
  reading: number;
  navigate: any;
  sensor_id: any;
  query: string;
}

interface State {
  isLoading: boolean;
}

export default class MainCircle extends React.Component<Props, State> {
  constructor(props: Props) {
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
    if (this.props.reading !== prevProps.reading) {
      setBackgroundColour(reading);
    }
  }
  render() {
    const navigate = this.props.navigate;
    const title = this.props.title;
    const reading = this.props.reading;
    const sensor_id = this.props.sensor_id;
    const query = this.props.query;
    return (
      <View style={styles.gridItem}>
        {/* <View style={styles.circle}> */}
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
            backgroundColor: setBackgroundColour(reading)
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
    );
  }
}
const setBackgroundColour = reading => {
  if (reading <= 30) {
    return "#66ff66";
  }
  if (reading > 30 && reading <= 50) {
    return "#1aff1a";
  }
  if (reading > 50 && reading <= 70) {
    return "#ffdb4d";
  }
  if (reading > 70 && reading <= 100) {
    return "#ffd633";
  }
  if (reading > 100 && reading <= 130) {
    return "#ff8c1a";
  }
  if (reading > 130 && reading <= 150) {
    return "#ff751a";
  }
  if (reading > 150 && reading <= 170) {
    return "#ff471a";
  }
  if (reading > 170 && reading <= 200) {
    return "#ff3300";
  }
  if (reading > 200 && reading <= 250) {
    return "#ff66b3";
  }
  if (reading > 250 && reading <= 300) {
    return "#cc0066";
  }
  if (reading > 300 && reading <= 400) {
    return "#660035";
  }
  if (reading > 400 && reading <= 500) {
    return "#33001a";
  }
};

const styles = StyleSheet.create({
  // circle: {
  //   width: 140,
  //   height: 140,
  //   borderRadius: 70,
  //   borderColor: "#13D0FF",
  //   borderWidth: 2,
  //   marginTop: 25,
  //   marginBottom: 5,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: setBackgroundColour()
  // },
  gridItem: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 22,
    color: "#3B7BFF"
  }
});
