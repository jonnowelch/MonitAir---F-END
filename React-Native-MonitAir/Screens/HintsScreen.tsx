import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../Components/Header";

interface Props {
  navigation: any;
}

const HintsScreen: React.SFC<Props> = props => (
  <>
    <Header navigate={props.navigation.navigate} />
    <View style={styles.container}>
      <Text> textInComponent </Text>
    </View>
  </>
);

HintsScreen.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default HintsScreen;
