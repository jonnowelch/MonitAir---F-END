import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import * as api from '../api';
import Loading from '../Components/Loading';

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
      sensor_id: ''
    };
  }

  render() {
    const { navigation } = this.props;
    const query = JSON.stringify(navigation.getParam('query')).split('"')[1];
    const { readings, date } = this.state;
    if (this.state.isLoading) return <Loading />;
    return (
      <>
        <Header navigate={this.props.navigation} />
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
            <Button title="<" onPress={this.handleDateChange} />
            <Text>{JSON.stringify(date).slice(1, 11)}</Text>
            <Button
              title=">"
              onPress={this.handleDateChange}
              disabled={date >= new Date() ? true : false}
            />
          </View>
        </View>
      </>
    );
  }

  handleDateChange = event => {
    console.log(event);
    this.setState(prevState => {
      const newDate = new Date(prevState.date);
      newDate.setDate(newDate.getDate() - 1);
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
        this.setState({ readings: data, isLoading: false, query, sensor_id });
      })
      .catch(err => {
        console.log(err);
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
          console.log(err);
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
