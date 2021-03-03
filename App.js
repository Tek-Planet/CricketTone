import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import useStateValue from './src/data/StateProvider';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import MainNavigation from './src/navigation/MainNavigation';
import SplashScreen from './src/screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: '#FFFFFF',
    text: '#000000',
  },
};

const App = () => {
  // variables
  // const [{}, dispatch] = useStateValue();
  const [state, setState] = useState({
    accessCodes: {},
    isLoading: true,
  });

  // const tokenData = {
  //   access_key: '7d57345feed8c93ebc43f2e0a2d4c8e2',
  //   secret_key: '77743e11913923fc67347e2cb2d3ab56',
  //   app_id: 'Test100',
  //   device_id: 'developer',
  // };

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
          accessCodes: res.data.auth,
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

  // checck if we have token stored
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('accessCodes');

      jsonValue != null
        ? //  here we check if has expire
          setState({
            ...state,
            accessCodes: JSON.parse(jsonValue),
            isLoading: false,
          })
        : //  here we add it newly
          tokenRequest();
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1500);
  }, []);

  if (state.isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer theme={CustomDefaultTheme}>
      <MainNavigation />
      {/* <Text>{JSON.stringify(state.accessCodes)}</Text> */}
    </NavigationContainer>
  );
};

export default App;
