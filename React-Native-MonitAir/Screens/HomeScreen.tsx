import { StyleSheet, Text, View, Button } from "react-native";
import Header from "../Components/Header";
import React from "react";
import Circle from "../Components/Circle";
import Loading from "../Components/Loading";
import axios from "axios";

export interface HomeProps {
  navigation: any;
}

interface State {
  isLoading: boolean;
  reading: any;
  errMsg: string;
  loggedInUser: any;
}

export default class HomeScreen extends React.Component<HomeProps, State> {
  constructor(props: HomeProps) {
    super(props);

    this.state = {
      loggedInUser: [],
      isLoading: true,
      reading: {},
      errMsg: ""
    };
  }
  componentDidMount() {
    axios
      .get(
        "http://brejconies.pythonanywhere.com/most_recent_reading/00000000b7b25684"
      )
      .then(r => {
        this.setState({ reading: r.data, isLoading: false });
      })
      .then(() => {
        axios.get("http://brejconies.pythonanywhere.com/user").then(r => {
          const { navigation } = this.props;
          const email = JSON.stringify(navigation.getParam("email")).split(
            '"'
          )[1];
          const checkUsers = r.data.filter(user => {
            if (user.email === email) {
              return user;
            }
          });
          this.setState({ loggedInUser: checkUsers, isLoading: false });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const { reading } = this.state;
    const { loggedInUser } = this.state;
    if (this.state.isLoading) return <Loading />;
    return (
      <>
        <Header navigate={this.props.navigation.navigate} />
        <Text>
          Hi {loggedInUser[0] && loggedInUser[0].username} welcome to your
          mointAir!
        </Text>
        <View style={styles.container}>
          <Circle
            title="Temperature - °C"
            navigate={this.props.navigation.navigate}
            reading={reading.temp_mean}
          />
          <Circle
            title="Pressure - Pa"
            navigate={this.props.navigation.navigate}
            reading={reading.pressure_mean}
          />
          <Circle
            title="Humidity - %"
            navigate={this.props.navigation.navigate}
            reading={reading.humidity_mean}
          />
          <Circle
            title="Air Quality - PPM"
            navigate={this.props.navigation.navigate}
            reading={reading.tvoc_mean}
          />
          <Text>
            Click the button below for hints and tips on how to keep the air
            quality clean in your home!
          </Text>
          <Button
            title="Hints & tips"
            color="#3B7BFF"
            onPress={() => {
              this.props.navigation.navigate("Hints");
            }}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
