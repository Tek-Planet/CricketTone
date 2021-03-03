import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function scoreListItem(item, navigation) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('MatchDetails', {key: item.key})}>
        <View style={styles.scoreBox}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text style={styles.teamName}>{item.teams.a.name}</Text>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.score}>120/3</Text>
              <Text style={styles.score}>14.4</Text>
            </View>

            <Text style={styles.seperator}>-</Text>

            <View style={{alignItems: 'center'}}>
              <Text style={styles.score}>120/3</Text>
              <Text style={styles.score}>14.4</Text>
            </View>
            <Text style={styles.teamName}>{item.teams.b.name}</Text>
          </View>
          <Text style={styles.completed}>{item.msgs.completed}</Text>
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
