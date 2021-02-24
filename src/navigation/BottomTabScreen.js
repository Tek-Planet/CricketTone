import React from 'react';
import {  Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen'
import NewsScreen from '../screens/NewsScreen'
import SeriesScreen from '../screens/SeriesScreen'
import MoreScreen from '../screens/MoreScreen'

// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
    activeColor="#FFFFFF"
    inactiveColor="#A9A9A9"
    initialRouteName="Matches"

    barStyle={{ backgroundColor: '#222222', height:60 }}
 
    screenOptions={({ route }) => ({    
   
      tabBarIcon: ({ focused, color }) => {
        let iconName;
        if (route.name === 'Matches') {
          iconName = focused
            ? 'tennisball'
            : 'tennisball-outline';
        } else if (route.name === 'News') {
          iconName = focused ? 'newspaper' : 'newspaper-outline';
        }
        else if (route.name === 'Series' ) {
        
            iconName = focused ? 'list' : 'list-outline';
          }
          else if (route.name === 'More') {
            iconName = focused ? 'ellipsis-horizontal' : 'ellipsis-horizontal-outline';
          }
         
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={26} color={color} />;
      },
    })}
    

  >
    <Tab.Screen name="Matches" component={HomeScreen}  />
    <Tab.Screen name="News"   component={NewsScreen} />
    <Tab.Screen name="Series" component={SeriesScreen} />
    <Tab.Screen name="More" component={MoreScreen} />
  </Tab.Navigator>
    
);

export default MainTabScreen;









  