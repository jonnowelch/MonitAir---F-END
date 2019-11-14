import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from "react-native";

export interface HeaderProps {
  navigate: (arg0: string) => {};
}

const Header: React.SFC<HeaderProps> = ({ navigate }) => {
  return (
    <>
      <View style={{ justifyContent: "center" }}>
        <TouchableHighlight onPress={() => navigate("Home")}>
          <Image
            source={require("../assets/transparent-logo.png")}
            style={{
              height: 100,
              width: 250,
              alignSelf: "center",
              marginTop: 10
            }}
          ></Image>
        </TouchableHighlight>
      </View>
    </>
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
