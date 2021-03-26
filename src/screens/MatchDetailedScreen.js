import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CustomNavigation from '../navigation/CustomBottomNav';
import axios from 'axios';
import LoadingData from '../components/LoadingData';
import {AuthContext} from '../context/AuthProvider';

function NewsScreen({route, navigation}) {
  const {token} = useContext(AuthContext);

  const [state, setState] = React.useState({
    match: {},
    isLoaded: false,
    error: false,
  });
  const {key} = route.params;
  useEffect(() => {
    console.log(key);
    console.log(token);
    setTimeout(() => {
      axios
        .get(
          `https://rest.cricketapi.com/rest/v2/match/${key}/?access_token=${token}`,
        )
        .then((res) => {
          console.log(res.data);
          setState({
            ...state,
            match: res.data.data.card,
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
    }, 1000);
  }, []);

  return (
    <View style={{flex: 1, marginBottom: 60}}>
      {state.isLoaded ? (
        <ScrollView>
          <View style={styles.scoreBox}>
            {/* <Text style={styles.subTeamName}>Batman 2 - 30*</Text> */}
            <View style={styles.team}>
              <Text style={styles.teamName}>{state.match.teams.a.name}</Text>
              <View style={{alignItems: 'center'}}>
                {Object.keys(state.match.innings).length !== 0 ? (
                  <View>
                    <Text style={styles.score}>
                      {state.match.innings.a_1.runs} /{' '}
                      {state.match.innings.a_1.wickets}{' '}
                    </Text>
                    <Text style={styles.score}>
                      {state.match.innings.a_1.overs}
                    </Text>
                  </View>
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.score}>0 / 0</Text>
                    <Text style={styles.score}>0</Text>
                  </View>
                )}
                <Text style={styles.subTeamName}>Batman 1 - 40*</Text>
                <Text style={styles.subTeamName}>Batman 2 - 30*</Text>
              </View>
            </View>
            <Text style={styles.seperator}>-</Text>
            <View style={styles.team}>
              <Text style={styles.teamName}>{state.match.teams.b.name}</Text>

              <View style={{alignItems: 'center'}}>
                {Object.keys(state.match.innings).length !== 0 ? (
                  <View>
                    <Text style={styles.score}>
                      {state.match.innings.b_1.runs} /{' '}
                      {state.match.innings.b_1.wickets}{' '}
                    </Text>
                    <Text style={styles.score}>
                      {state.match.innings.b_1.overs}
                    </Text>
                  </View>
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.score}>0 / 0</Text>
                    <Text style={styles.score}>0</Text>
                  </View>
                )}

                <Text style={styles.subTeamName}>Batman 1 - 40*</Text>
                <Text style={styles.subTeamName}>Batman 2 - 30*</Text>
              </View>
            </View>
          </View>

          <CustomNavigation match={state.match} />
        </ScrollView>
      ) : !state.error ? (
        <LoadingData />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{
              width: 200,
              height: 200,
              borderRadius: 100,
              marginBottom: 20,
            }}
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
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    elevation: 5,
  },

  teamName: {color: '#000', fontSize: 20, fontWeight: 'bold'},

  subTeamName: {color: '#000', fontSize: 16, textAlign: 'center'},

  team: {flexDirection: 'column', alignItems: 'center'},

  score: {color: '#000', fontSize: 16, marginTop: 10},

  seperator: {color: '#000', fontSize: 18, fontWeight: 'bold'},

  loadingText: {
    fontSize: 20,
    marginTop: 200,
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

// https://www.freepik.com/free-vector/webinar-flyer-template-set_11754457.htm#page=1&query=flyer%20template&position=26
