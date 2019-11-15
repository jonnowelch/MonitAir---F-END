import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface Props {}

const Loading: React.SFC<Props> = props => (
  <View style={{ justifyContent: "center" }}>
    <Image
      source={require("../assets/monitAir-app-icon.png")}
      style={{ height: 300, width: 300, alignSelf: "center", marginTop: "50%" }}
    ></Image>
  </View>
);

Loading.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Loading;