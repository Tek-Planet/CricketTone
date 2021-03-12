import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

function InfoScreen({match}) {
  return (
    <View>
      <View style={styles.headingBox}>
        <Text style={styles.headingText}>Playing XI</Text>
      </View>
      <View style={{}}>
        <View
          style={{
            margin: 5,
            flexDirection: 'row',
          }}>
          <View style={{width: '50%'}}>
            <Text style={styles.teamName}>{match.teams.a.name}</Text>

            {match.teams.a.match.playing_xi !== null ? (
              match.teams.a.match.playing_xi.map((step) => (
                <Text style={styles.playerName}>{step}</Text>
              ))
            ) : (
              <Text style={styles.teamList}>No team list found</Text>
            )}
          </View>

          <View style={{width: '50%'}}>
            <Text style={styles.teamName}>{match.teams.b.name}</Text>
            {match.teams.b.match.playing_xi !== null ? (
              match.teams.b.match.playing_xi.map((step) => (
                <Text key={step} style={styles.playerName}>
                  {step}
                </Text>
              ))
            ) : (
              <Text style={styles.teamList}>No team list found</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export default InfoScreen;

const styles = StyleSheet.create({
  headingBox: {
    padding: 5,
    backgroundColor: '#23395d',
    margin: 5,
    borderRadius: 10,
  },

  headingText: {color: '#FFF', fontSize: 22, fontWeight: 'bold'},

  playerName: {fontSize: 18, margin: 5, maxWidth: 200, textAlign: 'center'},

  teamName: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    textAlign: 'center',
  },

  teamList: {color: '#000', fontSize: 15},
});
