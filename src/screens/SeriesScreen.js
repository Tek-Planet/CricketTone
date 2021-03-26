import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';

import LoadingData from '../components/LoadingData';
import {AuthContext} from '../context/AuthProvider';

export function SeriesScreen({navigation}) {
  const {token} = useContext(AuthContext);
  const [state, setState] = useState({
    series: [],
    isLoaded: false,
    error: false,
  });

  const fetchData = () => {
    axios
      .get(
        `https://rest.cricketapi.com/rest/v2/recent_seasons/?access_token=${token}`,
      )
      .then((res) => {
        setState({
          ...state,
          series: res.data.data,
          isLoaded: true,
        });
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          console.log('Internet Problem');
          setState({
            ...state,
            error: true,
          });
        } else console.log('non Internet Problem');
      });
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
            fetchData(),
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

  useEffect(() => {
    setTimeout(() => {
      if (!state.isLoaded) {
        fetchData();
      } else console.log('Data is available');
    }, 1000);
  }, []);

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

  return (
    <View style={{flex: 1}}>
      {state.isLoaded ? (
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
    </View>
  );
}

export default SeriesScreen;

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
  },

  teamName: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'justify',
  },

  score: {color: '#000', fontSize: 16, textAlign: 'justify'},

  seperator: {color: '#000', fontSize: 18, fontWeight: 'bold'},

  textStyle: {
    color: '#E91E63',
    textDecorationLine: 'underline',
  },
  categoryList: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#23395d',
  },
  categoryListText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
