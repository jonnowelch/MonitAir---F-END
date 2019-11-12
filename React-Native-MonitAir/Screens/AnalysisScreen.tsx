import React, { Component } from "react";
import { Text, View, Image, FlatList } from "react-native";
import Header from "../Components/Header";

export interface AnalysisProps {
  navigation: any;
  title: string;
}
interface State {
  readings: object[];
}

export default class AnalysisScreen extends React.Component<
  AnalysisProps,
  State
> {
  constructor(props: AnalysisProps) {
    super(props);

    this.state = {
      readings: [
        { time_of_reading: "1", reading: 20.0 },
        { time_of_reading: "2", reading: 20.1 },
        { time_of_reading: "3", reading: 20.2 },
        { time_of_reading: "4", reading: 20.3 },
        { time_of_reading: "5", reading: 20.2 },
        { time_of_reading: "6", reading: 20.1 },
        { time_of_reading: "7", reading: 20.2 },
        { time_of_reading: "9", reading: 20.1 }
      ]
    };
  }

  render() {
    const title = JSON.stringify(this.props.navigation.getParam("title")).split(
      '"'
    )[1];
    const { readings } = this.state;
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
          <FlatList
            data={readings}
            renderItem={(item: any) => (
              <View key={item.item.time_of_reading}>
                <Text>{item.item.reading}</Text>
                <Text>{item.item.time_of_reading}</Text>
              </View>
            )}
            keyExtractor={(item: any, index: number) => index.toString()}
          />
        </View>
      </>
    );
  }
}
