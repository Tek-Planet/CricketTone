import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import MatchListItem from '../components/MatchListItem';

function SeriesMatchesScreen({matches, navigation}) {
  return (
    <FlatList
      data={matches}
      renderItem={({item}) => {
        return MatchListItem(item, navigation);
      }}
    />
  );
}

export default SeriesMatchesScreen;

const styles = StyleSheet.create({
  scoreBox: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#23395d',
  },

  teamName: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    textAlign: 'center',
  },

  score: {color: '#000', fontSize: 16},

  seperator: {color: '#000', fontSize: 18, fontWeight: 'bold'},

  completed: {
    marginTop: 10,
    marginStart: 10,
    fontSize: 15,
    color: '#000',
  },
});
