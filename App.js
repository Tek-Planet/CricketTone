import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {useStateValue} from './src/data/StateProvider';
import {StateProvider} from './src/data/StateProvider';
import reducer, {initialState} from './src/data/reducer';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import MainNavigation from './src/navigation/MainNavigation';
import SplashScreen from './src/screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: '#FFFFFF',
    text: '#000000',
  },
};

export function App() {
  // variables

  const [state, setState] = useState({
    accessCodes: {},
    isLoading: true,
  });

  // app entring do some background loading
  useEffect(() => {
    setTimeout(() => {
      // method to check if we have token on the device
      tokenRequest();
    }, 1500);
  }, []);

  // this sends request to the server to fetch access token
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

        // store the token in async stora for future uses
        storeToken(res.data.auth);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // method to store token
  const storeToken = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('accessCodes', jsonValue);
      console.log('stored');
    } catch (e) {
      console.log(e);
    }
  };

  if (state.isLoading) {
    return <SplashScreen />;
  }
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <NavigationContainer theme={CustomDefaultTheme}>
        <MainNavigation />
      </NavigationContainer>
    </StateProvider>
  );
}

export default App;
