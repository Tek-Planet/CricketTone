import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer,
  DefaultTheme as NavigationDefaultTheme, } from '@react-navigation/native';

import MainNavigation from './src/navigation/MainNavigation'
import SplashScreen from './src/screens/SplashScreen'


const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: '#FFFFFF',
    text: '#000000'
  }
}



const  App = () => {

const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout( () => {
      setIsLoading(false)
    },
     500);
  }, []);

  if(isLoading)
  {
    return( <SplashScreen/>  )
  }
  return (
       <NavigationContainer theme={CustomDefaultTheme}>
           <MainNavigation/>   
      </NavigationContainer>
  );
}

export default App