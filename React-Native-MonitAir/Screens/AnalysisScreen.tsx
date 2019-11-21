import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import * as api from '../api';
import Loading from '../Components/Loading';
import AQAnalysis from '../Components/AQAnalysis';
import HumidityAnalysis from '../Components/HumidityAnalysis';
import TemperatureAnalysis from '../Components/TemperatureAnalysis';

export interface AnalysisProps {
  navigation: any;
  title: string;
}
interface State {
  readings: object[];
  isLoading: boolean;
  date: Date;
  query: string;
  sensor_id: string;
  isErr: boolean;
}

export default class AnalysisScreen extends React.Component<
  AnalysisProps,
  State
> {
  constructor(props: AnalysisProps) {
    super(props);

    this.state = {
      readings: [],
      isLoading: true,
      date: new Date(),
      query: '',
      sensor_id: '',
      isErr: false
    };
  }

  render() {
    const { navigation } = this.props;
    const { readings, date, isLoading, isErr, query } = this.state;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isLoading) return <Loading />;
    if (isErr) return <Text>No more data to display</Text>;

    return (
      <>
        <Header navigate={navigation} />
        <Text>
          {query === 'total_quality_mean'
            ? 'Air Quality Index'
            : query === 'temp_mean'
            ? 'Temperature - °C'
            : 'Humidity - %'}
        </Text>
        <View style={styles.container}>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: { stroke: '#3B7BFF' },
                parent: { border: '1px solid #ccc' }
              }}
              data={readings}
              interpolation="basis"
            />
          </VictoryChart>
          <View style={styles.container}>
            <Button title="<" onPress={this.decreaseDate} />
            <Text>{JSON.stringify(date).slice(1, 11)}</Text>
            <Button
              title=">"
              onPress={this.increaseDate}
              disabled={date >= today ? true : false}
            />
          </View>
          {query === 'total_quality_mean' ? (
            <AQAnalysis readings={readings} />
          ) : null}
          {query === 'humidity_mean' ? (
            <HumidityAnalysis readings={readings} />
          ) : null}
          {query === 'temp_mean' ? (
            <TemperatureAnalysis readings={readings} />
          ) : null}
        </View>
      </>
    );
  }

  decreaseDate = () => {
    this.setState(prevState => {
      const newDate = new Date(prevState.date);
      newDate.setHours(0, 0, 0, 0);
      newDate.setDate(newDate.getDate() - 1);
      return { date: newDate };
    });
  };

  increaseDate = () => {
    this.setState(prevState => {
      const newDate = new Date(prevState.date);
      newDate.setHours(0, 0, 0, 0);
      newDate.setDate(newDate.getDate() + 1);
      return { date: newDate };
    });
  };

  componentDidMount() {
    const { navigation } = this.props;
    const { date } = this.state;
    const sensor_id = JSON.stringify(navigation.getParam('sensor_id')).split(
      '"'
    )[1];
    const query = JSON.stringify(navigation.getParam('query')).split('"')[1];

    api
      .getReadings(sensor_id, query, JSON.stringify(date).slice(1, 11))
      .then(data => {
        this.setState(() => {
          const date = new Date();
          date.setHours(0, 0, 0, 0);
          return { readings: data, isLoading: false, query, sensor_id, date };
        });
      })
      .catch(err => {
        this.setState({ isLoading: false, isErr: true });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.date) !== JSON.stringify(this.state.date)) {
      this.setState({ isLoading: true });
      const { query, date, sensor_id } = this.state;
      api
        .getReadings(sensor_id, query, JSON.stringify(date).slice(1, 11))
        .then(data => {
          this.setState({
            readings: data,
            isLoading: false
          });
        })
        .catch(err => {
          this.setState({ isLoading: false, isErr: true });
        });
    }
  }
}

const styles = StyleSheet.create({
  pagination_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  }
});
