import React from 'react';
import { View, Text, Image } from 'react-native';

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
        the day was {averageAQI}, which is considered {rank}.
      </Text>
      <Text>
        Your highest reading for the day was {highestAQI.y}, which was at{' '}
        {JSON.stringify(highestAQI.x).slice(12, 17)}. Are you able to identify
        what was happening around that time that would have lead to this index
        being high?
      </Text>
      <Text>
        Your lowest (best) reading for the day was {lowestAQI.y}, which was at{' '}
        {JSON.stringify(lowestAQI.x).slice(12, 17)}. Can you determine why?
      </Text>
      <Text>
        There's an explainer below. See our hints & tips page to see what you
        can do to improve this.
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
