import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface HeaderProps {
  navigate: (arg0: string) => {};
}

const Header: React.SFC<HeaderProps> = ({ navigate }) => {
  return (
    <View>
      <Text style={styles.header} onPress={() => navigate("Home")}>
        MonitAir
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    backgroundColor: "yellow",
    padding: 30,
    textAlign: "center"
  }
});

export default Header;
