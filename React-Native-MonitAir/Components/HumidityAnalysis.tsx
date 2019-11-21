import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface AnalysisProps {
  readings: object[];
}

const HumidityAnalysis = ({ readings }) => {
  readings = readings.sort((a, b) => a.y - b.y);

  const averageHumidity = Math.round(
    readings.map(reading => reading.y).reduce((a, b) => a + b, 0) /
      readings.length
  );

  let rank: string;
  if (averageHumidity < 100) rank = 'too high';
  if (averageHumidity < 50) rank = 'ideal';
  if (averageHumidity < 30) rank = 'too low';

  return (
    <View>
      <Text style={styles.text}>
        The average Humidity in your home for this day was {averageHumidity},
        which is considered {rank}. Ideal home humidity is between 30% and 50%.
        {'\n\n'}
      </Text>
      {rank === 'too high' ? (
        <>
          <Text style={styles.text}>
            Too high humidity levels in your home not only cause discomfort but
            can be damaging to your home, encouraging the spread of mold,
            mildew, funghi, bacteria and viruses.
            {'\n\n'}
            When indoor humidity levels are too high, asthma and allergy
            sufferers may experience worse or more frequent symptoms.
          </Text>
        </>
      ) : null}
      {rank === 'too low' ? (
        <>
          <Text style={styles.text}>
            Low humidity levels indoors can cause a host of issues for you and
            your home.
            {'\n\n'}
            When indoor air is too dry, asthma and allergy symptoms can worsen.
            Cold and flu viruses may spread more rapidly, and you may be more
            prone to sinus infections.
            {'\n\n'}
            You may suffer from dry skin, chapped lips, and dry air passageways.
            Dry air causes your body to feel colder, despite a warm indoor
            temperature. The dry air pulls moisture from your skin, leaving you
            colder and forcing you to turn up the temperature to stay
            comfortable. Therefore, more energy is expended to heat the home
            when a boost in humidity could have kept you comfortable for less.
          </Text>
        </>
      ) : null}
      {rank === 'ideal' ? (
        <Text style={styles.text}>Keep up the good work 😊</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Quicksand-SemiBold',
    color: '#3B7BFF'
  }
});

export default HumidityAnalysis;
