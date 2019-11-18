import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface CircleProps {
  title: string;
  reading: number;
  navigate: any;
  sensor_id: any;
  query: string;
}

const Circle: React.SFC<CircleProps> = ({
  title,
  reading,
  navigate,
  sensor_id,
  query
}) => {
  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: "#13D0FF",
    borderWidth: 2,
    marginTop: 25,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 22,
    color: "#3B7BFF"
  },
  gridItem: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Circle;
