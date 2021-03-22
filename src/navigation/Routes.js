
import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import SplashScreen from '../screens/SplashScreen'
import axios from 'axios';
import MainNavigation from './MainNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext}  from  '../context/AuthProvider'



const Routes = () => {
   const { setUser, setToken} = useContext(AuthContext);

  const [state, setState] = useState({
    accessCodes: {},
    isLoading: true,
  });

  const onAuthStateChanged = (user) => {
    setUser(user);
    console.log(user)
  };

  useEffect(() => {
    setTimeout(() => {
    tokenRequest();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
}, 5000);
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
        setToken(res.data.auth.access_token)
        // store the token in async stora for future uses
        storeToken(res.data.auth);
      })
      .catch((err) => {
        console.log(err);
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

