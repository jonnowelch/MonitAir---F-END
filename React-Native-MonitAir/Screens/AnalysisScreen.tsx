import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import React, { Component } from 'react';
import { Text, View, Button, Alert, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import axios from 'axios';
import Loading from '../Components/Loading';
import DatePicker from 'react-native-datepicker';

export interface AnalysisProps {
  navigation: any;
  title: string;
}
interface State {
  readings: object[];
  isLoading: boolean;
  date: Date;
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
      date: new Date()
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
            <Button title=">" onPress={this.handleDateChange} disabled={true} />
          </View>
        </View>
      </>
    );
  }

  handleDateChange = event => {
    console.log(event);
  };

  componentDidMount() {
    const { navigation } = this.props;
    const sensor_id = JSON.stringify(navigation.getParam('sensor_id')).split(
      '"'
    )[1];
    const query = JSON.stringify(navigation.getParam('query')).split('"')[1];
    axios
      .get(
        `http://brejconies.pythonanywhere.com/reading/${sensor_id}?measurement=${query}&lower_limit=2019-11-20&upper_limit=2019-11-20`
      )
      .then(({ data }) => {
        data = data.map(dataItem => {
          const time = new Date(dataItem.timestamp);
          dataItem.x = time;
          delete dataItem.timestamp;
          const measurement = dataItem[query];
          dataItem.y = measurement;
          delete dataItem[query];
          return dataItem;
        });
        this.setState({ readings: data, isLoading: false });
      })
      .catch(err => {
        console.log(err);
      });
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
