import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Loading: React.SFC = () => (
  <View style={{ justifyContent: 'center' }}>
    <Image
      source={require('../assets/monitAir-app-icon.png')}
      style={styles.icon}
    ></Image>
    <Image
      source={{
        uri:
          'https://cdn.dribbble.com/users/225707/screenshots/2958729/attachments/648705/straight-loader.gif'
      }}
      style={styles.loader}
    ></Image>
  </View>
);

const styles = StyleSheet.create({
  icon: { height: 300, width: 300, alignSelf: 'center', marginTop: '50%' },
  loader: { height: 70, width: 150, alignSelf: 'center', opacity: 1 }
});

export default Loading;
