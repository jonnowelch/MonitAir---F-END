import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface Props {}

const Loading: React.SFC<Props> = props => (
  <View style={{ justifyContent: "center" }}>
    <Image
      source={require("../assets/monitAir-app-icon.png")}
      style={{ height: 300, width: 300, alignSelf: "center", marginTop: "50%" }}
    ></Image>
    <Image
      source={{
        uri:
          "https://cdn.dribbble.com/users/225707/screenshots/2958729/attachments/648705/straight-loader.gif"
      }}
      style={{ height: 70, width: 150, alignSelf: "center", opacity: 1 }}
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
