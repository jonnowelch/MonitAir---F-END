import React from 'react';
import { View, Text, Image } from 'react-native';

export interface AnalysisProps {
  readings: object[];
}

const AQAnalysis = ({ readings }) => {
  readings = readings.sort((a, b) => a.y - b.y);

  const lowestReading = readings[0];
  const highestReading = readings[readings.length - 1];
  const dayAQI = readings.map(reading => reading.y);
  const averageAQI = dayAQI.reduce((a, b) => a + b, 0) / dayAQI.length;

  let rank: string;
  if (averageAQI < 500) rank = "'Hazardous'";
  if (averageAQI < 300) rank = "'Very Unhealthy'";
  if (averageAQI < 200) rank = "'Unhealthy'";
  if (averageAQI < 150) rank = "'Unhealthy for sensitive groups'";
  if (averageAQI < 100) rank = "'Moderate'";
  if (averageAQI < 50) rank = "'Good' - well done!";

  return (
    <View>
      <Text>
        Some analysis on your AQI readings: Your average Air Quality Index for
        the day was
        {averageAQI}, which is considered {rank}. There's an explainer below.
        See our hints & tips page to see what you can do to improve this.
      </Text>
      <Image
        source={require('../assets/PM2017.png')}
        style={{
          height: 100,
          width: 250,
          alignSelf: 'center',
          marginTop: 10
        }}
      ></Image>
    </View>
  );
};

export default AQAnalysis;
