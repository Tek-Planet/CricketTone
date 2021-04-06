import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import NewsListItem from '../components/NewListItem';
import LoadingData from '../components/LoadingData';
import {useStateValue} from '../data/StateProvider';
import {AuthContext} from '../context/AuthProvider';

function NewsScreen({navigation}) {
  const {token, news, fetchData} = useContext(AuthContext);

  const [state, setState] = React.useState({
    news: news ? news : [],
    isLoaded: true,
    error: false,
    refreshing: false,
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

  return (
    <View style={{flex: 1}}>
      {/* <View style={styles.headingBox}>
        <Text style={styles.headingText}>Latest News</Text>
      </View> */}

      {state.news ? (
        <FlatList
          data={news}
          renderItem={({item}) => {
            return NewsListItem(item, navigation);
          }}
          keyExtractor={(item) => item.title}
          refreshing={state.refreshing}
          onRefresh={() => fetchData(token)}
        />
      ) : !state.error ? (
        <LoadingData />
      ) : (
        errorPage()
      )}
    </View>
  );
}

export default NewsScreen;

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
    flexDirection: 'row',
    backgroundColor: '#fff',
    elevation: 5,
  },

  imgFlag: {width: 80, height: 80, borderRadius: 10},

  teamName: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'justify',
  },

  teamA: {flexDirection: 'row'},

  teamB: {flexDirection: 'row'},

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
    fontSize: 16,
  },
});
