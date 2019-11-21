import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface AnalysisProps {
  readings: object[];
}

const TemperatureAnalysis = ({ readings }) => {
  readings = readings.sort((a, b) => a.y - b.y);

  let averageTemp: any =
    readings.map(reading => reading.y).reduce((a, b) => a + b, 0) /
    readings.length;

  averageTemp = averageTemp.toFixed(2);

  let rankText: string;
  if (averageTemp > 23)
    rankText =
      'is too high and can cause cardiovascular risk.\n\nYou should take measures to keep the overall temperature of your home between 18°C and 21°C. 🥵';
  if (averageTemp <= 23)
    rankText =
      'is on the border of being too high.\n\nAnything outside of 18°C and 21°C will cause discomfort and extreme temperatures can be damaging to health.';
  if (averageTemp <= 21)
    rankText =
      'is ideal.\n\nTry to maintain a healthy temperature of between 18°C and 21°C.';
  if (averageTemp <= 18)
    rankText =
      'is on the border of being too low and can be damaging to your health.\n\nTry and keep your temp between 18°C and 21°C.';
  if (averageTemp <= 16)
    rankText =
      'is too low and can cause respiratory risk.\n\nTry and keep your temp between 18°C and 21°C.';
  if (averageTemp <= 12)
    rankText =
      'is far too low and can cause cardiovascular risk.\n\nTry and keep your temp between 18°C and 21°C.';
  if (averageTemp <= 9)
    rankText =
      'is waaaaaayyy too low and can cause a risk of hypothermia.\n\nTry and keep your temp between 18°C and 21°C... or you /will/ die. 🥶';

  return (
    <View>
      <Text style={styles.text}>
        The average temperature of your home on this day was {averageTemp}°C,
        which {rankText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Quicksand-SemiBold',
    color: '#3B7BFF'
  }
});

export default TemperatureAnalysis;
