import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import SplashScreen from '../screens/SplashScreen';
import axios from 'axios';
import MainNavigation from './MainNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthProvider';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';

const Routes = () => {
  const {setUser, setToken, isLoading, setUserProfile, fetchData} = useContext(
    AuthContext,
  );

  const [state, setState] = useState({
    accessCodes: {},
    error: false,
    token: '',
  });

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (user) {
      getUserDetails();
    }
    //console.log(user);
  };

  const listenToUserState = () => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  };

  useEffect(() => {
    tokenRequest();
    listenToUserState();

    // initiates google client
    GoogleSignin.configure({
      webClientId:
        '9169917780-eie2go8otjp9erku2mekigkpvpe5sgco.apps.googleusercontent.com',
    });
  }, []);

  const tokenRequest = () => {
    axios
      .post(
        'https://rest.cricketapi.com/rest/v2/auth/?access_key=7d57345feed8c93ebc43f2e0a2d4c8e2&secret_key=77743e11913923fc67347e2cb2d3ab56&app_id=Test100&device_id=developer',
      )
      .then((res) => {
        // console.log(res);
        setState({
          ...state,
          token: res.data.auth.access_token,
        });
        // set token for global use

        setToken(res.data.auth.access_token);
        // store the token in async stora for future uses
        storeToken(res.data.auth);

        fetchData(res.data.auth.access_token);
      })
      .catch((err) => {
        console.log(err);
        setState({
          ...state,
          error: true,
        });
      });
  };

  // fetch Data for Home Page

  const storeToken = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('accessCodes', jsonValue);
      // console.log('stored');
    } catch (e) {
      console.log(e);
    }
  };

  const getUserDetails = () => {
    AsyncStorage.getItem('userProfile').then((value) => {
      if (value !== null) {
        setUserProfile(JSON.parse(value));
      } else {
        console.log('No Profile Data found');
      }
    });
  };

  // error  page
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
            tokenRequest(),
            setState({
              ...state,
              error: false,
            }),
          ]}
          style={{
            padding: 14,
            borderRadius: 10,
            backgroundColor: '#23395d',
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 16,
            }}>
            {' '}
            Try Again
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (state.error) {
    return errorPage();
  }

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default Routes;
