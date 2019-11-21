import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export interface AnalysisProps {
  readings: object[];
}

const AQAnalysis = ({ readings }) => {
  readings = readings.sort((a, b) => a.y - b.y);

  const lowestAQI = readings[0];
  const highestAQI = readings[readings.length - 1];
  const averageAQI = Math.round(
    readings.map(reading => reading.y).reduce((a, b) => a + b, 0) /
      readings.length
  );

  let rank: string;
  if (averageAQI < 500) rank = "'Hazardous'.";
  if (averageAQI < 300) rank = "'Very Unhealthy'.";
  if (averageAQI < 200) rank = "'Unhealthy'.";
  if (averageAQI < 150) rank = "'Unhealthy for sensitive groups'.";
  if (averageAQI < 100) rank = "'Moderate'.";
  if (averageAQI < 50) rank = "'Good' - well done!";

  return (
    <View>
      <Text style={styles.text}>
        Some analysis on your AQI readings:
        {'\n'}
        {'\n'}
        Your average Air Quality Index for the day was {averageAQI}, which is
        considered {rank}
        {'\n'}
        {'\n'}
        Your highest reading for the day was {highestAQI.y}, which was at{' '}
        {JSON.stringify(highestAQI.x).slice(12, 17)}. Are you able to identify
        what was happening around that time that would have lead to this index
        being high?
        {'\n'}
        {'\n'}
        Your lowest (best) reading for the day was {lowestAQI.y}, which was at{' '}
        {JSON.stringify(lowestAQI.x).slice(12, 17)}. Can you determine why?
        {'\n'}
        {'\n'}
        See our hints & tips page for more details and a guide on what you can
        do to improve the air quality in your home.
      </Text>
      <LinearGradient
        colors={['#3B7BFF', '#13D0FF']}
        style={styles.linearGradient}
      >
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Hints')}
        >
          <Text style={styles.buttonText}>Hints & Tips</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Quicksand-SemiBold',
    color: '#3B7BFF'
  },
  linearGradient: {
    padding: 6,
    borderRadius: 10,
    height: 40,
    width: 120,
    alignSelf: 'center',
    marginTop: 10
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Quicksand-SemiBold'
  }
});

export default AQAnalysis;
