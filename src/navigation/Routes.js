import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import SplashScreen from '../screens/SplashScreen';
import axios from 'axios';
import MainNavigation from './MainNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthProvider';

const Routes = () => {
  const {setUser, setToken, setScores, setUserProfile} = useContext(
    AuthContext,
  );

  const [state, setState] = useState({
    accessCodes: {},
    isLoading: true,
  });

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (user) {
      getUserDetails();
    }
    //   console.log(user)
  };

  const listenToUserState = () => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  };

  useEffect(() => {
    tokenRequest();
    listenToUserState();
  }, []);

  const tokenRequest = () => {
    axios
      .post(
        'https://rest.cricketapi.com/rest/v2/auth/?access_key=7d57345feed8c93ebc43f2e0a2d4c8e2&secret_key=77743e11913923fc67347e2cb2d3ab56&app_id=Test100&device_id=developer',
      )
      .then((res) => {
        // set isloading true after the response
        setState({
          ...state,
          isLoading: false,
        });
        // set token for global use
        setToken(res.data.auth.access_token);
        // store the token in async stora for future uses
        storeToken(res.data.auth);

        fetchData(res.data.auth.access_token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // fetch Data for Home Page
  const fetchData = (token) => {
    axios
      .get(
        `https://rest.cricketapi.com/rest/v2/recent_matches/?access_token=${token}&card_type=summary_card`,
      )
      .then((res) => {
        setScores(res.data.data.cards);
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

  const storeToken = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('accessCodes', jsonValue);
      console.log('stored');
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

  if (state.isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default Routes;
