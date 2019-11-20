import React from 'react';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';

interface Props {
  title: string;
  reading: number;
  navigate: any;
  sensor_id: string;
  query: string;
}

interface State {
  isLoading: boolean;
}

export default class MainCircle extends React.Component<Props, State> {
  constructor(props: Props) {
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
    if (this.props.reading !== prevProps.reading) {
      setBackgroundColour(reading);
    }
  }
  render() {
    const navigate = this.props.navigate;
    const title = this.props.title;
    const reading = this.props.reading;
    const sensor_id = this.props.sensor_id;
    const query = this.props.query;
    return (
      <View style={styles.gridItem}>
        <View
          style={{
            width: 180,
            height: 180,
            borderRadius: 90,
            borderColor: '#3B7BFF',
            borderWidth: 3,
            marginTop: 25,
            marginBottom: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: setBackgroundColour(reading)
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
    );
  }
}
const setBackgroundColour = reading => {
  if (reading <= 50) return '#29BF12'; // KELLY GREEN
  if (reading < 100) return '#C2E812'; // BITTER LEMON
  if (reading <= 150) return '#FFB400'; // UCLA GOLD
  if (reading <= 200) return '#F6511D'; // ORIOLES ORANGE
  if (reading <= 500) return '#DD1C1A'; // MAXIMUM RED
};

const styles = StyleSheet.create({
  gridItem: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#ffffe6'
  }
});
