import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import React from 'react';
import {
  Alert,
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView
} from 'react-native';
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
  errResponse: string;
  noMoreReadings: boolean;
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
      errResponse: '',
      noMoreReadings: false
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    const { readings, date, isLoading, errResponse, query } = this.state;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isLoading) return <Loading />;
    if (errResponse)
      Alert.alert('Error', errResponse, [
        {
          text: 'OK',
          onPress: () => this.setState({ errResponse: '', isLoading: false })
        }
      ]);

    return (
      <>
        <Header navigate={navigate} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {query === 'total_quality_mean'
              ? 'Air Quality Index'
              : query === 'temp_mean'
              ? 'Temperature - °C'
              : 'Humidity - %'}
          </Text>
        </View>
        <ScrollView style={styles.scroller}>
          <View style={styles.mainContainer}>
            <View style={styles.chartContainer}>
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
              <View style={styles.paginationContainer}>
                <Button
                  color="#3B7BFF"
                  title="<"
                  onPress={() => {
                    this.handleDateChange(-1);
                  }}
                  disabled={this.state.noMoreReadings ? true : false}
                />
                <Text style={styles.paginationText}>
                  {JSON.stringify(date).slice(1, 11)}
                </Text>
                <Button
                  color="#3B7BFF"
                  title=">"
                  onPress={() => {
                    this.handleDateChange(1);
                  }}
                  disabled={date >= today ? true : false}
                />
              </View>
            </View>
            <View style={styles.analysisContainer}>
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
          </View>
        </ScrollView>
      </>
    );
  }

  handleDateChange = (change: number) => {
    this.setState(prevState => {
      const newDate = new Date(prevState.date);
      newDate.setHours(0, 0, 0, 0);
      newDate.setDate(newDate.getDate() + change);
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
      .then(readings => {
        this.setState(() => {
          const date = new Date();
          date.setHours(0, 0, 0, 0);
          return { readings, isLoading: false, query, sensor_id, date };
        });
      })
      .catch(({ response: { data } }) => {
        this.setState({
          errResponse: data.msg,
          isLoading: false,
          noMoreReadings: true
        });
      });
  }

  removeErr() {
    this.setState({ errResponse: '' });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.date) !== JSON.stringify(this.state.date) &&
      !this.state.noMoreReadings
    ) {
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
        .catch(({ response: { data } }) => {
          this.setState(prevState => {
            const newDate = new Date(prevState.date);
            newDate.setHours(0, 0, 0, 0);
            newDate.setDate(newDate.getDate() + 1);
            return {
              date: newDate,
              errResponse: data.msg,
              isLoading: false,
              noMoreReadings: true
            };
          });
        });
    }
  }
}

const styles = StyleSheet.create({
  paginationContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationText: {
    fontFamily: 'Quicksand-SemiBold',
    color: '#3B7BFF',
    padding: 5
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  title: {
    alignSelf: 'center',
    fontSize: 22,
    fontFamily: 'Quicksand-SemiBold',
    color: '#13D0FF'
  },
  titleContainer: {
    position: 'absolute',
    flex: 1,
    width: '100%',
    paddingTop: 60,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chartContainer: {
    position: 'relative',
    width: '100%'
  },
  analysisContainer: {
    padding: 10,
    margin: 10,
    marginTop: 20,
    borderColor: '#13D0FF',
    borderWidth: 2,
    borderRadius: 8
  },
  scroller: {
    marginTop: 15
  }
});
