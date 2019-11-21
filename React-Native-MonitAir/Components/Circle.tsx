import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface CircleProps {
  title: string;
  reading: number;
  navigate: any;
  sensor_id: string;
  query: string;
}

interface State {
  isLoading: boolean;
}

export default class Circle extends React.Component<CircleProps, State> {
  constructor(props: CircleProps) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    const { title, reading } = this.props;
    if (this.props.reading !== prevProps.reading) {
      setBackgroundColour(reading, title);
    }
  }
  render() {
    const { navigate, title, sensor_id, query, reading } = this.props;
    return (
      <>
        <View style={styles.gridItem}>
          <View
            style={{
              ...styles.circle,
              backgroundColor: setBackgroundColour(reading, title)
            }}
          >
            <Text
              style={styles.text}
              onPress={() => {
                navigate('Analysis', {
                  title,
                  sensor_id,
                  query
                });
              }}
            >
              {Math.round(reading)}
              {query === 'temp_mean' ? '°C' : '%'}
            </Text>
          </View>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </>
    );
  }
}
const setBackgroundColour = (reading, title) => {
  if (title === 'Temperature') {
    if (reading <= 12) return '#00A6ED'; // VIVID CERULEAN
    if (reading <= 18) return '#88CCF1'; // BABY BLUE
    if (reading <= 24) return '#29BF12'; // KELLY GREEN
    if (reading <= 30) return '#FFB400'; // UCLA GOLD
    if (reading > 30) return '#DD1C1A'; // MAXIMUM RED
  } else {
    if (reading < 20) return '#00A6ED'; // VIVID CERULEAN
    if (reading < 40) return '#88CCF1'; // BABY BLUE
    if (reading < 60) return '#29BF12'; // KELLY GREEN
    if (reading < 80) return '#FFB400'; // UCLA GOLD
    if (reading > 80) return '#DD1C1A'; // MAXIMUM RED
  }
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    color: '#ffffe6',
    fontFamily: 'Quicksand-SemiBold'
  },
  gridItem: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: '#3B7BFF',
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Quicksand-SemiBold'
  },
  circle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderColor: 'whitesmoke',
    borderWidth: 3,
    marginTop: 25,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
