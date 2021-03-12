import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

function MyWeb({route}) {
  const {url} = route.params;
  return (
    <View style={{flex: 1}}>
      <WebView originWhitelist={['*']} source={{uri: url}} />
    </View>
  );
}

export default MyWeb;

const styles = StyleSheet.create({
  headingBox: {
    padding: 10,
    backgroundColor: '#23395d',
    margin: 5,
    borderRadius: 10,
  },

  headingText: {color: '#FFF', fontSize: 22, fontWeight: 'bold'},
});
