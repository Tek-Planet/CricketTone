import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const newsListItem = (item, navigation) => {
  return (
    <View style={styles.scoreBox}>
      <Text style={styles.teamName}>{item.title}</Text>
      <Text style={styles.score}>{item.description_text}</Text>
      <Text
        style={styles.textStyle}
        onPress={() =>
          navigation.navigate('NewsDetails', {
            screen: 'NewsInfo',
            params: {url: item.provider.url},
          })
        }>
        continue reading
      </Text>
    </View>
  );
};

export default newsListItem;

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
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginBottom: 5,
  },

  score: {color: '#000', fontSize: 16, textAlign: 'justify'},

  textStyle: {
    color: '#E91E63',
    textDecorationLine: 'underline',
  },
});
