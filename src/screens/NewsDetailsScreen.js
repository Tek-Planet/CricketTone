import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

function DetailedScreen() {
  return (
    <View style={styles.scoreBox}>
      <Image style={styles.imgFlag} source={require('../assets/flag.png')} />
      <Text style={styles.teamName}>Headline One</Text>
      <Text style={styles.score}>
        Divergences not only signal a potential trend reversal, but they can
        also be used as a possible.
      </Text>
    </View>
  );
}

export default DetailedScreen;

const styles = StyleSheet.create({
  scoreBox: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    alignItems: 'center',
  },

  imgFlag: {width: 150, height: 150, borderRadius: 10},

  teamName: {
    color: 'grey',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  teamA: {flexDirection: 'row'},

  teamB: {flexDirection: 'row'},

  score: {color: '#000', fontSize: 16, textAlign: 'justify'},

  seperator: {color: '#000', fontSize: 18, fontWeight: 'bold'},
});
