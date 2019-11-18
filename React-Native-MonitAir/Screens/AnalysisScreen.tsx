import React, { Component } from "react";
import { Text, View, Image, FlatList } from "react-native";
import Header from "../Components/Header";
import axios from "axios";
import Loading from "../Components/Loading";

export interface AnalysisProps {
  navigation: any;
  title: string;
}
interface State {
  readings: object[];
  isLoading: boolean;
}

export default class AnalysisScreen extends React.Component<
  AnalysisProps,
  State
> {
  constructor(props: AnalysisProps) {
    super(props);

    this.state = {
      readings: [],
      isLoading: true
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
    const title = JSON.stringify(this.props.navigation.getParam("title")).split(
      '"'
    )[1];
    const { readings } = this.state;
    console.log(readings);
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
          <FlatList
            data={readings}
            renderItem={(item: any) => (
              <View key={item.item.timestamp}>
                <Text>{item.item.temp_mean}</Text>
                <Text>{item.item.tvoc_mean}</Text>
              </View>
            )}
            keyExtractor={(item: any, index: number) => index.toString()}
          />
        </View>
      </>
    );
  }
}
