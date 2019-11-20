import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface CircleProps {
  title: string;
  reading: number;
  navigate: any;
  sensor_id: any;
  query: string;
}

interface State {
  isLoading: boolean;
}
// title,
// reading,
// navigate,
// sensor_id,
// query

export default class Circle extends React.Component<CircleProps, State> {
  constructor(props: CircleProps) {
    super(props);
    this.state = {
      isLoading: true
    };
  }
  componentDidMount() {
    this.setState({ isLoading: false });
  }
  componentDidUpdate(prevProps, prevState) {
    const reading = this.props.reading;
    const title = this.props.title;
    if (this.props.reading !== prevProps.reading) {
      setBackgroundColour(reading, title);
    }
  }
  render() {
    const navigate = this.props.navigate;
    const title = this.props.title;
    const sensor_id = this.props.sensor_id;
    const query = this.props.query;
    const reading = this.props.reading;
    return (
      <>
        <View style={styles.gridItem}>
          <View
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,
              borderColor: '#3B7BFF',
              borderWidth: 3,
              marginTop: 25,
              marginBottom: 5,
              justifyContent: 'center',
              alignItems: 'center',
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
              {reading}
            </Text>
          </View>
          <Text style={{ color: '#3B7BFF' }}>{title}</Text>
        </View>
      </>
    );
  }
}
const setBackgroundColour = (reading, title) => {
  if (title === 'Temperature - °C') {
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
    fontWeight: 'bold',
    color: '#ffffe6'
  },
  gridItem: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
