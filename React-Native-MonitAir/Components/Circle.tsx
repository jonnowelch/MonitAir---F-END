import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface CircleProps {
  title: string;
  reading: number;
}

const Circle: React.SFC<CircleProps> = ({ title, reading }) => {
  return (
    <>
      <View style={styles.gridItem}>
        <View style={styles.circle}>
          <Text style={styles.text}>{reading}</Text>
        </View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "black",
    borderWidth: 2,
    marginTop: 25,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 22
  },
  gridItem: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Circle;
