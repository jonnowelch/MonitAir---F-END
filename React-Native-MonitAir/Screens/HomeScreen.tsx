import { StyleSheet, Text, View } from "react-native";
import Header from "../Components/Header";
import React from "react";

export default function HomeScreen(props) {
  return (
    <>
      <Header navigate={props.navigation.navigate} />
      <View style={styles.container}>
        <Text>Welcome to the MonitAir Homepage</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
