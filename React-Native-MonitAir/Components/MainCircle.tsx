import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";

interface Props {
  title: string;
  reading: number;
  navigate: any;
  sensor_id: any;
  query: string;
}

const MainCircle: React.SFC<Props> = ({
  title,
  reading,
  navigate,
  sensor_id,
  query
}) => (
  <View style={styles.gridItem}>
    <View style={styles.circle}>
      <Text
        style={styles.text}
        onPress={() => {
          navigate("Analysis", {
            title,
            sensor_id,
            query
          });
        }}
      >
        {reading}
      </Text>
    </View>
    <Text style={{ color: "#3B7BFF" }}>{title}</Text>
  </View>
);

MainCircle.defaultProps = {};

const styles = StyleSheet.create({
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderColor: "#13D0FF",
    borderWidth: 2,
    marginTop: 25,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  gridItem: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 22,
    color: "#3B7BFF"
  }
});

export default MainCircle;
