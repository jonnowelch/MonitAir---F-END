import React from "react";
import { View, StyleSheet } from "react-native";
import { formatTime } from "../utils/formatTime";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis
} from "victory-native";
import axios from "axios";
import Loading from "./Loading";

export default class Chart extends React.Component {
  state = {
    data: [
      {
        total_quality_mean: 18,
        timestamp: "2019-11-19T00:00:04.313695"
      },
      {
        total_quality_mean: 18,
        timestamp: "2019-11-19T00:00:14.871472"
      }
    ],
    startDate: "",
    endDate: "",
    isLoading: true
  };

  componentDidMount() {
    let startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    let endDate = new Date();
    endDate.setHours(24, 0, 0, 0);
    let startMidnight = JSON.stringify(startDate);
    let endMidnight = JSON.stringify(endDate);
    let endSlice = endMidnight.slice(1, 11);
    let startSlice = startMidnight.slice(1, 11);

    this.setState({ startDate: startMidnight, endDate: endMidnight }, () => {
      axios
        .get(
          `http://brejconies.pythonanywhere.com/reading/00000000b7b25684?measurement=total_quality_mean&upper_limit=${endSlice}
          )}&lower_limit=${startSlice}`
        )
        .then(({ data }) => {
          //   console.log(data);
          this.setState({
            data
          });
        })
        .then(() => {
          this.setState({ isLoading: false });
        })
        .catch(console.log);
    });
  }

  render() {
    // formatTime(this.state.data);

    return (
      <>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <View>
            <VictoryChart width={350}>
              <VictoryLine
                data={formatTime(this.state.data)}
                x="timestamp"
                y="total_quality_mean"
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" }
                }}
              />
              <VictoryAxis
                domain={[0, 86400]}
                tickValues={[0, 14400, 28800, 43200, 57600, 72000, 86400]}
                tickFormat={[
                  "12am",
                  "4am",
                  "8am",
                  "12pm",
                  "4pm",
                  "8pm",
                  "12am"
                ]}
              />
              <VictoryAxis
                dependentAxis
                domain={[0, 200]}
                // domain={
                //   this.props.temp_mean
                //     ? [0, 40]
                //     : this.props.humidity
                //     ? [0, 100]
                //     : [0, 200]
                // }
              />
            </VictoryChart>
          </View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  }
});
