import React from "react";
import { Alert, View, Text, StyleSheet } from "react-native";

interface ErrResponseProps {
  errResponse: string;
  removeErr: () => void;
}

const ErrResponse: React.SFC<ErrResponseProps> = ({ errResponse, removeErr }) =>
  Alert.alert("Error Occurred!", errResponse, [
    {
      text: "OK",
      onPress: () => removeErr()
    }
  ]);

ErrResponse.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ErrResponse;
