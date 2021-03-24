import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import MatchDetailsScreen from '../screens/MatchDetailedScreen';
import SeriesDetailsScreen from '../screens/SeriesDetailsScreen';
import NewsDetailsScreen from '../screens/NewsDetailsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignInScreen';

import BottomTab from './BottomTabScreen';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();

function OtherStackScreen() {
  return (
    <RootStack.Navigator headerMode={'none'} initialRouteName="SignUp">
      <RootStack.Screen name="Home" component={BottomTab} />
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="MatchDetails" component={MatchDetailsStack} />
      <RootStack.Screen name="NewsDetails" component={NewsDetailsStack} />
      <RootStack.Screen name="SeriesDetails" component={SeriesDetailsStack} />
      <RootStack.Screen name="SignIn" component={SignInScreen} />
      <RootStack.Screen name="SignUp" component={SignUpScreen} />
    </RootStack.Navigator>
  );
}

export default OtherStackScreen;

const MatchDetailsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: 'Match Details',

      headerStyle: {
        backgroundColor: '#23395d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen name="MatchInfo" component={MatchDetailsScreen} />
  </Stack.Navigator>
);

const NewsDetailsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitle: 'CricketTone',

      headerStyle: {
        backgroundColor: '#23395d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen name="NewsInfo" component={NewsDetailsScreen} />
  </Stack.Navigator>
);

const SeriesDetailsStack = () => (
  <Stack.Navigator
    screenOptions={{
      // headerTitle: 'Info',

      headerStyle: {
        backgroundColor: '#23395d',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <Stack.Screen name="SeriesInfo" component={SeriesDetailsScreen} />
  </Stack.Navigator>
);
