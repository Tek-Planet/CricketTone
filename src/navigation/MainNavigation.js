import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen'
import MatchDetailsScreen from '../screens/MatchDetailedScreen'
import BottomTab from './BottomTabScreen'



const RootStack = createStackNavigator();

function OtherStackScreen ({navigation,  route}) {
  
   return (
    <RootStack.Navigator initialRouteName="Home" headerMode='none'>
      <RootStack.Screen name="Home" component={BottomTab}/>
      <RootStack.Screen name="Splash" component={SplashScreen}/>
      <RootStack.Screen name="MatchDetails" component={MatchDetailsScreen}/>
      
    </RootStack.Navigator>
   )
};

export default OtherStackScreen;