import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import React, { Component } from 'react';
import { Text, View, Image, FlatList, StyleSheet } from 'react-native';
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
  // date: string
}

export default class AnalysisScreen extends React.Component<
  AnalysisProps,
  State
> {
  constructor(props: AnalysisProps) {
    super(props);

    this.state = {
      readings: [],
      isLoading: true
      // date:
    };
  }
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
          // const formattedTime = time.getTime();
          // dataItem.x = formattedTime;
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
  render() {
    const { navigation } = this.props;
    const query = JSON.stringify(navigation.getParam('query')).split('"')[1];
    const { readings } = this.state;
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

          <Text>{JSON.stringify(new Date())}</Text>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff'
  }
});
