import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface Props {}

const EasterEgg: React.SFC<Props> = props => (
  <>
    <Image
      source={require("../assets/transparent-logo.png")}
      style={{ height: 100, width: 250, alignSelf: "center", marginTop: 40 }}
    ></Image>
    <View style={styles.container}>
      <Text
        style={{
          color: "#13D0FF",
          fontSize: 22,
          marginTop: 30,
          marginBottom: 30,
          alignSelf: "center"
        }}
      >
        {" "}
        Meet The monitAir Team!!{" "}
      </Text>
      <Image
        source={require("../assets/BeFunky-collage.png")}
        style={{ height: 300, width: 350, marginTop: 20, alignSelf: "center" }}
      ></Image>
      <Text
        style={{
          color: "#3B7BFF",
          marginTop: 20,
          fontSize: 16,
          alignSelf: "center",
          padding: 10
        }}
      >
        The team would like to thank you so much for using and enjoying our app!
        Friendly reminder to please always ensure the co3 levels in your home
        are at a safe level!
      </Text>
    </View>
  </>
);

EasterEgg.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default EasterEgg;
