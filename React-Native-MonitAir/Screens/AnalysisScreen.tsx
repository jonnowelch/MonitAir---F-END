import React, { Component } from "react";
import { Text, View, Image, FlatList } from "react-native";
import Header from "../Components/Header";
import axios from "axios";
import Loading from "../Components/Loading";
import DatePicker from "react-native-datepicker";

export interface AnalysisProps {
  navigation: any;
  title: string;
}
interface State {
  readings: object[];
  isLoading: boolean;
  dateFrom: Date;
  dateTo: Date;
}

export default class AnalysisScreen extends React.Component<
  AnalysisProps,
  State
> {
  constructor(props: AnalysisProps) {
    super(props);

    this.state = {
      readings: [],
      isLoading: true,
      dateFrom: null,
      dateTo: null
    };
  }
  componentDidMount() {
    const { navigation } = this.props;
    const sensor_id = JSON.stringify(navigation.getParam("sensor_id")).split(
      '"'
    )[1];
    const query = JSON.stringify(navigation.getParam("query")).split('"')[1];
    axios
      .get(
        `http://brejconies.pythonanywhere.com/reading/${sensor_id}?measurement=${query}&lower_limit=2019-11-18&upper_limit=2019-11-19`
      )
      .then(r => {
        this.setState({ readings: r.data, isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { navigation } = this.props;
    const query = JSON.stringify(navigation.getParam("query")).split('"')[1];
    const title = JSON.stringify(this.props.navigation.getParam("title")).split(
      '"'
    )[1];
    const { readings } = this.state;
    if (this.state.isLoading) return <Loading />;
    return (
      <>
        <Header navigate={this.props.navigation.navigate} />
        <View>
          <Text> Anal Isis Screen 4 {title} </Text>
          <Image
            style={{ width: 250, height: 250 }}
            source={{
              uri: "https://media.giphy.com/media/xT77XKxcPqxIZqUrwk/giphy.gif"
            }}
          />
          <Text>Select date range to see analysis</Text>
          <Text>Date from</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.dateFrom}
            mode="date"
            placeholder="Select Date"
            format="YYYY-MM-DD"
            minDate="2018-01-01"
            maxDate="2019-11-22"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={date => {
              this.setState({ dateFrom: date });
            }}
          ></DatePicker>
          <Text>Date To</Text>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.dateTo}
            mode="date"
            placeholder="Select Date"
            format="YYYY-MM-DD"
            minDate="2018-01-01"
            maxDate="2019-11-22"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={date => {
              this.setState({ dateTo: date });
            }}
          ></DatePicker>
          <FlatList
            data={readings}
            renderItem={(item: any) => (
              <View key={item.item.timestamp}>
                <Text>{item.item[query]}</Text>
              </View>
            )}
            keyExtractor={(item: any, index: number) => index.toString()}
          />
        </View>
      </>
    );
  }
}
