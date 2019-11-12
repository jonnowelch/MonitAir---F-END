import { StyleSheet, Text, View } from "react-native";
import Header from "../Components/Header";
import React from "react";

export interface Props {
  navigation: any;
}

interface State {
  reading1: number;
  reading2: number;
  reading3: number;
  reading4: number;
}

export default class Hello extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      reading1: 0,
      reading2: 0,
      reading3: 0,
      reading4: 0
    };
  }

  render() {
    return (
      <>
        <Header navigate={this.props.navigation.navigate} />
        <View style={styles.container}>
          <Text>We're at the homepage</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
