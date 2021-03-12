import React, {useEffect} from 'react';
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

function NewsScreen({navigation}) {
  const [{token}, dispatch] = useStateValue();

  const [state, setState] = React.useState({
    news: [],
    isLoaded: false,
    error: false,
  });

  const fetchData = () => {
    axios
      .get(
        `https://rest.cricketapi.com/rest/v2/news_aggregation/?access_token=${token}`,
      )
      .then((res) => {
        //   console.log(res.data)
        setState({
          ...state,
          news: res.data.data.news,
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

  useEffect(() => {
    setTimeout(() => {
      if (!state.isLoaded) fetchData();
    }, 5000);
  }, []);

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

  return (
    <View style={{flex: 1}}>
      {/* <View style={styles.headingBox}>
        <Text style={styles.headingText}>Latest News</Text>
      </View> */}

      {state.isLoaded ? (
        <FlatList
          data={state.news}
          renderItem={({item}) => {
            return NewsListItem(item, navigation);
          }}
          keyExtractor={(item) => item.title}
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
