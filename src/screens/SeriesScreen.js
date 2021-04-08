import React, {useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import LoadingData from '../components/LoadingData';
import {AuthContext} from '../context/AuthProvider';
import GestureRecognizer from 'react-native-swipe-gestures';
import Header from '../components/Header';

export function SeriesScreen({navigation}) {
  const {token, series, fetchData} = useContext(AuthContext);
  const [state, setState] = useState({
    series: series ? series : [],
    isLoaded: false,
    error: false,
  });

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

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (!state.isLoaded) {
  //       fetchData();
  //     } else console.log('Data is available');
  //   }, 1000);
  // }, []);

  const seriesListItem = (item) => {
    return (
      <View style={styles.scoreBox}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SeriesDetails', {
              screen: 'SeriesInfo',
              params: {key: item.key, name: item.name},
            })
          }>
          <Text style={styles.teamName}>{item.name}</Text>
        </TouchableOpacity>
        <Text style={styles.score}>Venue: {item.venue}</Text>
        <Text style={styles.score}>Start Date: {item.start_date.str}</Text>
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View style={styles.headingBox}>
        <Text style={styles.headingText}>Series</Text>
      </View>
    );
  };
  const onSwipeRight = () => {
    navigation.navigate('More');
  };

  const onSwipeLeft = () => {
    navigation.goBack();
  };
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  return (
    <GestureRecognizer
      onSwipeRight={() => onSwipeRight()}
      onSwipeLeft={() => onSwipeLeft()}
      config={config}
      style={{
        flex: 1,
      }}>
      <Header header={'Series'} />
      {state.series ? (
        <FlatList
          data={state.series}
          renderItem={({item}) => {
            return seriesListItem(item);
          }}
          keyExtractor={(item) => item.key}
        />
      ) : !state.error ? (
        <LoadingData />
      ) : (
        errorPage()
      )}
    </GestureRecognizer>
  );
}

export default SeriesScreen;

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
  },

  score: {color: '#000', fontSize: 16, textAlign: 'justify'},
  seperator: {color: '#000', fontSize: 18, fontWeight: 'bold'},
});
