import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import MatchListItem from '../components/MatchListItem';
import LoadingData from '../components/LoadingData';

import {AuthContext} from '../context/AuthProvider';
import GestureRecognizer from 'react-native-swipe-gestures';
import Header from '../components/Header';
export default function HomeScreen({navigation}) {
  const {token, scores, fetchData} = useContext(AuthContext);
  //  hold all state
  // const [{token}, dispatch] = useStateValue();

  const [state, setState] = useState({
    scores: scores ? scores : [],
    isLoaded: true,
    error: false,
    access_token: '',
    accessCodes: {
      access_token: 'default',
      expires: '0',
    },
    refreshing: false,
  });

  const onSwipeRight = () => {
    navigation.navigate('News');
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const errorPage = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{width: 200, height: 200, borderRadius: 100, marginBottom: 20}}
          source={require('../assets/imgs/err.jpg')}
        />
        <Text style={{color: '#000', fontSize: 18, marginBottom: 10}}>
          Hmm. We’re having trouble fetching data
        </Text>

        <Text style={{color: '#000', fontSize: 18, marginBottom: 20}}>
          Check your network connection.
        </Text>

        <TouchableOpacity
          onPress={() => [
            fetchData(token),
            setState({
              ...state,
              error: false,
            }),
          ]}
          style={[styles.categoryList]}>
          <Text style={styles.categoryListText}> Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <GestureRecognizer
      onSwipeRight={() => onSwipeRight()}
      config={config}
      style={{
        flex: 1,
      }}>
      <Header header={'Live Scores'} />
      {state.scores ? (
        <FlatList
          data={scores}
          renderItem={({item}) => {
            return MatchListItem(item, navigation);
          }}
          keyExtractor={(item) => item.key}
          refreshing={state.refreshing}
          onRefresh={() => fetchData(token)}
        />
      ) : !state.error ? (
        <LoadingData />
      ) : (
        errorPage()
      )}
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  headingBox: {
    padding: 10,
    backgroundColor: '#23395d',
    margin: 5,
    borderRadius: 10,
  },

  headingText: {color: '#FFF', fontSize: 22, fontWeight: 'bold'},

  scoreBox: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#23395d',
  },

  imgFlag: {width: 30, height: 30, borderRadius: 100, marginBottom: 20},

  teamName: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
    width: 100,
    textAlign: 'center',
  },

  teamA: {flexDirection: 'row'},

  teamB: {flexDirection: 'row'},

  score: {color: '#000', fontSize: 16},

  seperator: {color: '#000', fontSize: 18, fontWeight: 'bold'},

  completed: {
    marginTop: 10,
    marginStart: 10,
    fontSize: 15,
    color: '#000',
  },

  categoryList: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#23395d',
  },
  categoryListText: {
    color: '#ffffff',
    fontSize: 16,
  },
});
