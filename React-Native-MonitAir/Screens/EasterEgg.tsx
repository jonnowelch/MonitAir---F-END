import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  navigation: any;
}

const EasterEgg: React.SFC<Props> = props => (
  <>
    <Image
      source={require('../assets/transparent-logo.png')}
      style={{ height: 100, width: 250, alignSelf: 'center', marginTop: 40 }}
    ></Image>
    <View style={styles.container}>
      <Text
        style={{
          color: '#13D0FF',
          fontSize: 22,
          marginTop: 30,
          marginBottom: 30,
          alignSelf: 'center',
          fontFamily: 'Quicksand-SemiBold'
        }}
      >
        {' '}
        Meet The monitAir Team!!{' '}
      </Text>
      <Image
        source={require('../assets/BeFunky-collage.png')}
        style={{ height: 300, width: 350, marginTop: 20, alignSelf: 'center' }}
      ></Image>
      <Text
        style={{
          color: '#3B7BFF',
          marginTop: 20,
          fontSize: 16,
          alignSelf: 'center',
          padding: 10,
          fontFamily: 'Quicksand-SemiBold'
        }}
      >
        The team would like to thank you so much for using and enjoying our app!
        Friendly reminder to please always ensure that the co3 levels in your
        home are at a safe level!
      </Text>
      <View
        style={{
          width: 200,
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: 10
        }}
      >
        <LinearGradient
          colors={['#3B7BFF', '#13D0FF']}
          style={{ padding: 15, borderRadius: 10 }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          >
            <Text
              style={{
                color: 'white',
                alignSelf: 'center',
                fontFamily: 'Quicksand-SemiBold'
              }}
            >
              Back to Dashboard
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  </>
);

EasterEgg.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default EasterEgg;
