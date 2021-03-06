import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function scoreListItem(item, navigation) {
  return (
    <View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MatchDetails', {
            screen: 'MatchInfo',
            params: {key: item.key},
          })
        }>
        <View style={styles.scoreBox}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text style={styles.teamName}>{item.teams.a.name}</Text>
            <View style={{alignItems: 'center'}}>
              {Object.keys(item.innings).length !== 0 ? (
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.score}>
                    {item.innings.a_1.runs} / {item.innings.a_1.wickets}
                  </Text>
                  <Text style={styles.score}>{item.innings.a_1.overs} </Text>
                </View>
              ) : (
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.score}>0 / 0</Text>
                  <Text style={styles.score}>0</Text>
                </View>
              )}
            </View>

            <Text style={styles.seperator}>-</Text>

            <View style={{alignItems: 'center'}}>
              {Object.keys(item.innings).length !== 0 ? (
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.score}>
                    {item.innings.b_1.runs} / {item.innings.b_1.wickets}
                  </Text>
                  <Text style={styles.score}>{item.innings.b_1.overs}</Text>
                </View>
              ) : (
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.score}>0 / 0</Text>
                  <Text style={styles.score}>0</Text>
                </View>
              )}
            </View>
            <Text style={styles.teamName}>{item.teams.b.name}</Text>
          </View>
          <Text style={styles.completed}>
            Start Date: {item.start_date.str}
          </Text>
          {item.status === 'completed' ? (
            <Text style={[styles.completed, {color: 'green'}]}>
              {item.msgs.completed}
            </Text>
          ) : null}

          {item.status === 'notstarted' ? (
            <Text style={styles.completed}>Match Not Started</Text>
          ) : null}

          {item.status !== 'notstarted' && item.status !== 'completed' ? (
            <Text style={styles.completed}>Live</Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default scoreListItem;

const styles = StyleSheet.create({
  scoreBox: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
  },

  teamName: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    textAlign: 'center',
  },

  score: {color: '#000', fontSize: 15, fontWeight: 'bold'},

  seperator: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginStart: 20,
    marginEnd: 20,
  },

  completed: {
    marginTop: 10,
    marginStart: 10,
    fontSize: 15,
    color: '#000',
  },
});
