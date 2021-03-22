import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import MatchListItem from '../components/MatchListItem';
import LoadingData from '../components/LoadingData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setToken} from '../redux/actions/dataAction';
import  {AuthContext} from  '../context/AuthProvider'

export default function HomeScreen({navigation}) {

  const { token } = useContext(AuthContext);
  //  hold all state
  // const [{token}, dispatch] = useStateValue();

  const [state, setState] = useState({
    scores: [],
    isLoaded: false,
    error: false,
    access_token: '',
    accessCodes: {
      access_token: 'default',
      expires: '0',
    },
  });

  // app entering

  useEffect(() => {
    setTimeout(() => {
     fetchData(token);
    }, 5000);
  }, []);

  // getData from async storage
  const getData = async () => {
    try {
      const accessCodes = await AsyncStorage.getItem('accessCodes');

      if (accessCodes !== null) {
        // conver the retrived data to json
        const newCodes = JSON.parse(accessCodes);
        // this will save token in the context api for other aplliations to use
        setToken(newCodes.access_token, dispatch);
        // fetch data from api using stored access stoken
        fetchData(newCodes.access_token);
      } else {
        console.log('No JSON data found');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  // make request to the api server
  const fetchData = (token) => {
    axios
      .get(
        `https://rest.cricketapi.com/rest/v2/recent_matches/?access_token=${token}&card_type=summary_card`,
      )
      .then((res) => {
        setState({
          ...state,
          scores: res.data.data.cards,
          isLoaded: true,
        });
      })
      .catch((err) => {
        //  console.log(err.type)
        if (err.message === 'Network Error') {
          console.log('Internet Problem');
          setState({
            ...state,
            error: true,
          });
        } else console.log(err.message);
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

  return (
    <View style={{flex: 1}}>
      {/* <View style={styles.headingBox}>
        <Text style={styles.headingText}>Live Scores</Text>
      </View> */}

      {state.isLoaded ? (
        <FlatList
          data={state.scores}
          renderItem={({item}) => {
            return MatchListItem(item, navigation);
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
