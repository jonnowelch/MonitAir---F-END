import React from 'react';
import { View, StyleSheet, Image, TouchableHighlight } from 'react-native';

export interface HeaderProps {
  navigate: (arg0: string) => {};
  unclickable?: boolean;
}

const Header: React.SFC<HeaderProps> = ({ navigate, unclickable }) => {
  return (
    <>
      <View style={{ justifyContent: 'center' }}>
        <TouchableHighlight
          underlayColor={'white'}
          onPress={() => {
            if (!unclickable) navigate('Home');
          }}
        >
          <Image
            source={require('../assets/transparent-logo.png')}
            style={styles.img}
          ></Image>
        </TouchableHighlight>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    backgroundColor: 'yellow',
    padding: 30,
    textAlign: 'center'
  },
  img: {
    height: 100,
    width: 250,
    alignSelf: 'center',
    marginTop: 10
  }
});

export default Header;
